import { Address } from "viem";

export type VoteMessageType = {
  from: Address;
  timestamp: bigint;
  round: number;
  choice: { protocol: string; votes: bigint; id: string }[];
  app: string;
};

export const voteMessageTypes = {
  Vote: [
    { name: "from", type: "address" },
    { name: "timestamp", type: "uint256" },
    { name: "round", type: "uint16" },
    { name: "choice", type: "Choice[]" },
    { name: "app", type: "string" },
  ],
  Choice: [
    { name: "protocol", type: "string" },
    { name: "votes", type: "uint256" },
    { name: "id", type: "string" },
  ],
} as const;
