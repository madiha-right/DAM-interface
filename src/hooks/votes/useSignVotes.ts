import { type Address, useSignTypedData } from "wagmi";
import { voteMessageTypes, type VoteMessageType } from "@/types/vote";

type ArgsType = {
  from: Address;
  timestamp: bigint;
  roundId: number;
  choices: { protocol: string; votes: bigint; id: string }[];
};

export const useSignVotes = (args: ArgsType) => {
  const message: VoteMessageType = {
    from: args.from,
    timestamp: args.timestamp,
    round: args.roundId,
    choice: args.choices,
    app: "DAM",
  };

  const signTypedData = useSignTypedData({
    domain: {},
    message,
    types: voteMessageTypes,
    primaryType: "Vote",
  });

  return {
    isLoading: signTypedData.isLoading,
    isSuccess: signTypedData.isSuccess,
    data: signTypedData.data,
    writeAsync: signTypedData.signTypedDataAsync,
  };
};
