"use server";

import { parse } from "graphql";
import { gql, request } from "graphql-request";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Address, encodeAbiParameters, hexToSignature, keccak256, parseAbiParameters } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ethereumPublicClient } from "@/lib/viem";
import dbConnect from "@/lib/dbConnect";
import Round, { type IStat, type IRoundBase } from "@/models/Round";
import { type IProtocolWithStat, getProtocols } from "@/actions/protocols";
import { DAM_SUBGRAPH_URL } from "@/utils/site";
import { PERCENTAGE_FACTOR } from "@/utils/constants";
import { StreamType } from "@/models/Protocol";

type RoundQueryType = {
  id: number;
  startTime: bigint;
  endTime: bigint;
  reinvestmentRatio: number;
  autoStreamRatio: number;
};

const currentRoundQuery: TypedDocumentNode<{ rounds: RoundQueryType[] }> = parse(gql`
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

export const queryCurrentRound = async () => {
  try {
    const res = await request(DAM_SUBGRAPH_URL, currentRoundQuery);
    const data = res.rounds[0];

    return data;
  } catch (error) {
    console.error(error);
  }
};

interface ICurrentRound extends IRoundBase {
  protocols: IProtocolWithStat[];
  startTime: bigint;
  endTime: bigint;
  autoStreamRatio: number;
  reinvestmentRatio: number;
}

export const getRound = async (roundId: number): Promise<IProtocolWithStat[]> => {
  try {
    await dbConnect();

    const round = await Round.findOne({ roundId }).populate("protocols.protocol");

    if (!round) {
      throw new Error("No round found");
    }

    // NOTE: to get startTime, endTime, autoStreamRatio, reinvestmentRatio, add subgraph query by roundId
    return round.protocols;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * TODO:
 * 5. update ui using getRound
 * 6. add routes to add protocol to db - add both protocols and round(protocol ids)
 * 6. empty db and test it on ui
 */
export const startRound = async (): Promise<ICurrentRound | undefined> => {
  try {
    const blockNumber = await ethereumPublicClient.getBlockNumber();
    const snapshotBlockNumber = blockNumber - BigInt(1);
    const currentRound = await queryCurrentRound();
    const protocols = await getProtocols();
    const protocolIdsWithStat = protocols.map((item) => ({
      id: item.protocol._id,
      stat: {
        ...item.stat,
        miles: {
          ...item.stat.miles,
          start: item.stat.miles.today,
          accumulatedStart: item.stat.miles.accumulated,
        },
      },
    }));

    if (!currentRound) {
      throw new Error("No current round found");
    }

    await dbConnect();

    const round = await Round.create({
      roundId: currentRound.id,
      snapshot: snapshotBlockNumber,
      totalVotes: BigInt(0),
      protocols: protocolIdsWithStat,
    });

    await round.save();

    return {
      ...round,
      startTime: currentRound.startTime,
      endTime: currentRound.endTime,
      autoStreamRatio: currentRound.autoStreamRatio,
      reinvestmentRatio: currentRound.reinvestmentRatio,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchEndRoundData = async () => {
  try {
    const currentRound = await queryCurrentRound();
    const oracle = privateKeyToAccount(process.env.ORACLE_PRIVATE_KEY);

    if (!currentRound) {
      throw new Error("No current round found from subgraph");
    }

    const protocols = await getProtocols();
    const protocolIdsWithStat = protocols.map((item) => ({
      id: item.protocol._id,
      stat: {
        ...item.stat,
        miles: {
          ...item.stat.miles,
          end: item.stat.miles.today,
          accumulatedEnd: item.stat.miles.accumulated,
        },
      },
    }));

    await dbConnect();

    const updatedRound = await Round.findOneAndUpdate(
      { roundId: currentRound.id },
      { $set: { protocols: protocolIdsWithStat } },
      { new: true },
    ).populate("protocols.protocol");

    if (!updatedRound) {
      throw new Error("Failed to update round");
    }

    const { receivers, proportions } = calcDistributions({
      ...updatedRound,
      autoStreamRatio: currentRound.autoStreamRatio,
      reinvestmentRatio: currentRound.reinvestmentRatio,
    });
    const data = encodeAbiParameters(parseAbiParameters("address[], uint16[]"), [
      receivers,
      proportions,
    ]);

    // const receivers: Address[] = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
    // const proportions: number[] = [10000];
    // const data = encodeAbiParameters(parseAbiParameters("address[], uint16[]"), [
    //   receivers,
    //   proportions,
    // ]);

    const hexSignature = await oracle.signMessage({ message: { raw: keccak256(data) } });
    const signature = hexToSignature(hexSignature);

    return { signature, data };
  } catch (error) {
    console.error(error);
  }
};

const calcDistributions = (round: ICurrentRound) => {
  const combined: Record<Address, number> = {};
  const totalIncentive = PERCENTAGE_FACTOR - round.reinvestmentRatio;

  let totalPoints = 0;
  let leftProportionsAuto = (totalIncentive * round.autoStreamRatio) / PERCENTAGE_FACTOR;

  const protocolsAuto = round.protocols
    .filter(
      (item) =>
        (item.protocol.type === StreamType.Auto || item.protocol.type === StreamType.Both) &&
        (item.stat.miles.start || 0) > 0 &&
        (item.stat.miles.accumulatedStart || 0) > 0,
    )
    .map((item) => {
      const points = calcPoints(item.stat);
      totalPoints += points;

      return { ...item, stat: { ...item.stat, points } };
    });

  for (let i = 0; i < protocolsAuto.length; i++) {
    const item = protocolsAuto[i];
    const isLast = i === protocolsAuto.length - 1;
    const proportion = isLast
      ? leftProportionsAuto
      : Math.floor((item.stat.points / totalPoints) * PERCENTAGE_FACTOR);

    combined[item.protocol.treasuryAddress] = proportion;
    leftProportionsAuto -= proportion;
  }

  let leftProportionsCommunity = totalIncentive - leftProportionsAuto;

  const protocolsCommunity = round.protocols.filter(
    (item) =>
      (item.protocol.type === StreamType.Community || item.protocol.type === StreamType.Both) &&
      (item.stat.votes?.total || 0) > 0,
  );

  for (let i = 0; i < protocolsCommunity.length; i++) {
    const item = protocolsCommunity[i];
    const isLast = i === protocolsCommunity.length - 1;
    const proportion = isLast
      ? leftProportionsCommunity
      : Math.floor(
          Number((item.stat.votes?.total || BigInt(0)) / round.totalVotes) * PERCENTAGE_FACTOR,
        );

    combined[item.protocol.treasuryAddress]
      ? (combined[item.protocol.treasuryAddress] += proportion)
      : (combined[item.protocol.treasuryAddress] = proportion);
    leftProportionsCommunity -= proportion;
  }

  const receivers: Address[] = Object.keys(combined) as Address[];
  const proportions: number[] = Object.values(combined);

  return { receivers, proportions };
};

const calcPoints = (stat: IStat) => {
  if (!stat.miles?.start || !stat.miles?.accumulatedStart) {
    return 0;
  }

  const drgr = ((stat.miles?.end as number) / (stat.miles?.start as number)) * 10;
  const aagr =
    ((stat.miles?.accumulatedEnd as number) / (stat.miles?.accumulatedStart as number)) * 10;

  return drgr + aagr;
};
