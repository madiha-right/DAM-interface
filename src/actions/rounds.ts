import { parse } from "graphql";
import { gql, request } from "graphql-request";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DAM_SUBGRAPH_URL } from "@/utils/site";

type RoundType = {
  id: string;
  startTime: bigint;
  endTime: bigint;
};

const currentRoundQuery: TypedDocumentNode<{ rounds: RoundType[] }> = parse(gql`
  query currentRound {
    rounds(where: { ongoing: true }) {
      id
      startTime
      endTime
    }
  }
`);

export const getCurrentRound = async () => {
  const res = await request(DAM_SUBGRAPH_URL, currentRoundQuery);
  const data = res.rounds[0];

  return data;
};
