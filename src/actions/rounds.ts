"use server";

import mongoose from "mongoose";
import { parse } from "graphql";
import { gql, request } from "graphql-request";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Address, encodeAbiParameters, hexToSignature, parseAbiParameters } from "viem";
import { publicClient, oracle } from "@/lib/viem";
import dbConnect from "@/lib/dbConnect";
import Round, { type IProtocol, type IRound, type IStat } from "@/models/Round";
import { getProtocolsAuto } from "@/actions/protocols";
import { DAM_SUBGRAPH_URL } from "@/utils/site";

type RoundType = {
  id: number;
  startTime: bigint;
  endTime: bigint;
  reinvestmentRatio: number;
  autoStreamRatio: number;
};

const currentRoundQuery: TypedDocumentNode<{ rounds: RoundType[] }> = parse(gql`
  query currentRound {
    rounds(where: { ongoing: true }) {
      id
      startTime
      endTime
      autoStreamRatio
      reinvestmentRatio
    }
  }
`);

export const getCurrentRound = async () => {
  try {
    const res = await request(DAM_SUBGRAPH_URL, currentRoundQuery);
    const data = res.rounds[0];

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const startRound = async () => {
  try {
    const blockNumber = await publicClient.getBlockNumber();
    const snapshotBlockNumber = blockNumber - BigInt(1);
    const protocolsAuto = await getProtocolsAuto();
    const currentRound = await getCurrentRound();

    if (protocolsAuto.length === 0) {
      throw new Error("No protocols found");
    }
    if (!currentRound) {
      throw new Error("No current round found");
    }

    const protocols = protocolsAuto.map(
      (protocol): IProtocol => ({
        _id: protocol._id as unknown as mongoose.Types.ObjectId,
        name: protocol.name,
        categories: protocol.categories,
        website: protocol.website,
        stat: {
          milesOnStart: protocol.stat.milesToday,
          milesAccumulatedOnStart: protocol.stat.milesAccumulated,
        },
      }),
    );

    await dbConnect();

    const round = await Round.create({
      roundId: currentRound.id,
      snapshot: snapshotBlockNumber,
      protocols: protocols,
    });

    return round;
  } catch (error) {
    console.error(error);
  }
};

// TODO: auto <> community ratio
export const endRound = async () => {
  try {
    const currentRound = await getCurrentRound();

    if (!currentRound) {
      throw new Error("No current round found from subgraph");
    }

    const round = await insertMilesOnEnd(currentRound.id);
    const data = calcDistributions(round.protocols);
    const hexSignature = await oracle.signMessage({ message: data });
    const signature = hexToSignature(hexSignature);

    return {
      signature,
      data,
    };
  } catch (error) {
    console.error(error);
  }
};

const insertMilesOnEnd = async (roundId: number): Promise<IRound> => {
  const protocolsAuto = await getProtocolsAuto();

  await dbConnect();

  const round = await Round.findOne({ roundId });

  if (!round) {
    throw new Error("No round found");
  }

  const combined: Record<string, IProtocol> = {};

  for (const item of round.protocols) {
    combined[item._id.toString()] = item;
  }

  for (const item of protocolsAuto) {
    if (combined[item._id.toString()]) {
      combined[item._id.toString()].stat.milesOnEnd = item.stat.milesToday;
      combined[item._id.toString()].stat.milesAccumulatedOnEnd = item.stat.milesAccumulated;
    }
  }

  const protocols = Object.values(combined);

  const updatedRound = await Round.findOneAndUpdate(
    { roundId },
    { $set: { protocols: protocols } },
    { new: true },
  );

  if (!updatedRound) {
    throw new Error("Failed to update round");
  }

  return updatedRound;
};

// TODO: endround script

// TODO: auto <> community ratio
const calcDistributions = (protocols: IProtocol[]) => {
  const receivers: Address[] = [];
  const proportions: number[] = [];

  let totalPoints = 0;
  let leftProportion = 10000;

  const protocolsWithPoints = protocols
    .filter((item) => item.treasuryAddress)
    .map((item) => {
      const points = calcPoints(item.stat);
      totalPoints += points;

      return {
        ...item,
        points,
      };
    });

  for (let i = 0; i < protocolsWithPoints.length; i++) {
    const protocol = protocolsWithPoints[i];
    const isLast = i === protocolsWithPoints.length - 1;
    const proportion = isLast ? leftProportion : Math.floor(protocol.points / totalPoints) * 10000;

    receivers.push(protocol.treasuryAddress!);
    proportions.push(proportion);

    leftProportion -= proportion;
  }

  return encodeAbiParameters(parseAbiParameters("address[], uint16[]"), [receivers, proportions]);
};

const calcPoints = (stat: IStat) => {
  const drgr = ((stat.milesOnEnd as number) / stat.milesOnStart) * 10;
  const aagr = ((stat.milesAccumulatedOnEnd as number) / stat.milesAccumulatedOnStart) * 10;

  return drgr + aagr;
};
