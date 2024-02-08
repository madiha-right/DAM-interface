import { NextPage } from "next";
import type { Metadata } from "next";
import type { IProtocolWithStat } from "@/actions/protocols";
import { getCurrentRoundUpstream, getRound } from "@/actions/rounds";
import { StreamType } from "@/models/Protocol";
import SectionProtocolDetail from "./SectionProtocolDetail";
import SectionTable from "./SectionTable";

export const metadata: Metadata = {
  title: "DAM | Community",
  description: "Distribution based on community gauge-voting until the end of round.",
};

/**
 * TODO:
 * 7. vote off-chain
 * 8. database
 */
const CommunityPage: NextPage = async () => {
  const currentRound = await getCurrentRoundUpstream();
  const round = await getRound(currentRound?.id as number);
  const protocols = round?.protocols as IProtocolWithStat[];
  const protocolsCommunity = protocols.filter(
    (item) => item.protocol.type === StreamType.Community || item.protocol.type === StreamType.Both,
  );

  return (
    <div className="flex items-start gap-[16px]">
      <SectionTable protocols={protocolsCommunity} />
      <SectionProtocolDetail protocols={protocolsCommunity} totalVotes={round?.totalVotes} />
    </div>
  );
};

export default CommunityPage;
