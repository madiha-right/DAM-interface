import { NextPage } from "next";
import type { Metadata } from "next";
import { getProtocolsWithStat } from "@/actions/protocols";
import { getCurrentRoundUpstream, getRound } from "@/actions/rounds";
import { StreamType } from "@/models/Protocol";
import SectionProtocolDetail from "./SectionProtocolDetail";
import SectionTable from "./SectionTable";
import { toObject } from "@/utils/format";

export const metadata: Metadata = {
  title: "DAM | Community",
  description: "Distribution based on community gauge-voting until the end of round.",
};

const CommunityPage: NextPage = async () => {
  const currentRoundUpstream = await getCurrentRoundUpstream();
  const round = await getRound(currentRoundUpstream?.id as number);
  const protocols = await getProtocolsWithStat(currentRoundUpstream?.id as number);
  const protocolsCommunity = protocols
    ? toObject(protocols)
        .filter(
          (item) =>
            item.protocol.type === StreamType.Community || item.protocol.type === StreamType.Both,
        )
        .map((item) => {
          const totalVotes = round?.totalVotes;
          const received = item.stat.votes?.total || BigInt(0);
          const weight =
            totalVotes && totalVotes !== "0" ? BigInt(received) / BigInt(totalVotes) : 0;

          return {
            ...item,
            stat: { ...item.stat, votes: { ...item.stat.votes, weight: Number(weight) } },
          };
        })
    : [];

  return (
    <div className="flex items-start gap-[16px]">
      <SectionTable protocols={protocolsCommunity} />
      <SectionProtocolDetail
        roundId={currentRoundUpstream?.id as number}
        protocols={protocolsCommunity}
        snapshotBlockNumber={round?.snapshot as bigint}
      />
    </div>
  );
};

export default CommunityPage;
