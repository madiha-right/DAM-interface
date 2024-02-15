"use server";

import { parse } from "graphql";
import { gql, request } from "graphql-request";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Address, verifyTypedData } from "viem";
import dbConnect from "@/lib/dbConnect";
import Round, { type IRound } from "@/models/Round";
import User, { type IUser } from "@/models/User";
import { voteMessageTypes, type VoteMessageType } from "@/types/vote";
import { getCurrentRoundUpstream } from "@/actions/rounds";
import { PERCENTAGE_FACTOR } from "@/utils/constants";

export type VotingPowerDataType = {
  delegates: {
    votes: string;
    id: string;
    bitVotes: string;
    l2MntVotes: string;
    mntVotes: string;
  }[];
};

const votingPowerQuery: TypedDocumentNode<VotingPowerDataType> = parse(gql`
  query GetDelegate($block: BigInt!, $address: ID!) {
    delegates(block: $block, where: { id: $address }) {
      votes
      id
      bitVotes
      l2MntVotes
      mntVotes
    }
  }
`);

export const requestGetVotingPower = async (block: bigint, address: Address) => {
  return await request("https://api.delegatevote.mantle.xyz/graphql", votingPowerQuery, {
    block: block.toString(),
    address,
  });
};

export type CastVoteArgsType = {
  hexSignature: `0x${string}`;
  message: VoteMessageType;
};

export const requestPostCastVote = async ({ hexSignature, message }: CastVoteArgsType) => {
  const isValid = await verifyTypedData({
    address: message.from,
    domain: {},
    message,
    types: voteMessageTypes,
    primaryType: "Vote",
    signature: hexSignature,
  });

  if (!isValid) {
    throw new Error("Invalid signature");
  }

  const currentRoundUpstream = await getCurrentRoundUpstream();

  if (!currentRoundUpstream) {
    throw new Error("No current round found");
  }
  if (message.round !== currentRoundUpstream.id) {
    throw new Error("Invalid round");
  }
  if (message.choice.length === 0) {
    throw new Error("No choice");
  }
  // if (
  //   Number(currentRoundUpstream.startTime) > Number(message.timestamp) ||
  //   Number(currentRoundUpstream.endTime) < Number(message.timestamp)
  // ) {
  //   // TODO:
  //   throw new Error("Invalid timestamp");
  // }

  await dbConnect();

  const round: IRound | null = await Round.findOne({ roundId: message.round });
  let user: IUser | null = await User.findOne({ address: message.from });

  if (!round) {
    throw new Error("No round found");
  }
  if (!user) {
    user = new User({ address: message.from, rounds: [] }) as IUser;
  }
  if (user.rounds.includes(round._id)) {
    throw new Error("User already voted in this round");
  }

  const { delegates } = await requestGetVotingPower(
    round.snapshot,
    "0xbc66065e9640Df94338c6956297ca90ec116651d",
  );
  // const { delegates } = await requestGetVotingPower(round.snapshot, message.from); //TODO:

  if (delegates.length === 0 || delegates[0].votes === "0") {
    throw new Error("No voting power");
  }

  const { votes, bitVotes, mntVotes, l2MntVotes } = delegates[0];
  const totalBallot = message.choice.reduce((acc, choice) => acc + choice.votes, BigInt(0));

  const newProtocols = round.protocols.map((item) => {
    const choice = message.choice.find((choice) => choice.id === item.protocol._id.toString());

    if (!choice) {
      return item;
    }

    const weight = BigInt(
      Math.floor((Number(choice.votes) / Number(totalBallot)) * PERCENTAGE_FACTOR),
    );
    const castedBitVotes = (weight * BigInt(bitVotes)) / BigInt(PERCENTAGE_FACTOR);
    const castedMntVotes = (weight * BigInt(mntVotes)) / BigInt(PERCENTAGE_FACTOR);
    const castedL2MntVotes = (weight * BigInt(l2MntVotes)) / BigInt(PERCENTAGE_FACTOR);
    const castedVotes = castedBitVotes + castedMntVotes + castedL2MntVotes;

    return {
      ...item,
      stat: {
        ...item.stat,
        votes: {
          bit: addStrBigInt(item.stat.votes?.bit, castedBitVotes),
          mnt: addStrBigInt(item.stat.votes?.mnt, castedMntVotes),
          l2Mnt: addStrBigInt(item.stat.votes?.l2Mnt, castedL2MntVotes),
          total: addStrBigInt(item.stat.votes?.total, castedVotes),
        },
      },
    };
  });

  round.protocols = newProtocols;
  round.totalVotes = addStrBigInt(round.totalVotes, votes);
  user.rounds.push(round._id);

  await user.save();
  await round.save();

  /**
   * TODO:
   * 3. refetch the round with updated votes, reset the local states
   * 4. close modal and show success or error toast
   */
};

const addStrBigInt = (a?: bigint | string, b?: bigint | string): string => {
  if (!a && !b) {
    return "0";
  }
  if (!a) {
    return b!.toString();
  }
  if (!b) {
    return a.toString();
  }
  return (BigInt(a) + BigInt(b)).toString();
};
