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

/**
 * TODO:
 * 3. implement vote off-chain ui
 * 4. vote off-chain api + db
 * - get voting power from https://api.delegatevote.mantle.xyz/graphql?query=query+GetDelegate+%7B%0A++delegates%28block%3A+19455119%2C+where%3A+%7Bid%3A+%220xbc66065e9640Df94338c6956297ca90ec116651d%22%7D%29+%7B%0A++++votes%0A++++id%0A++++bitVotes%0A++++l2MntVotes%0A++++mntVotes%0A++%7D%0A%7D#
 */

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
          const votesProtocol = item.stat.votes?.total || BigInt(0);
          const weight = totalVotes ? Number(votesProtocol / totalVotes) : 0;

          return { ...item, stat: { ...item.stat, votes: { ...item.stat.votes, weight } } };
        })
    : [];

  return (
    <div className="flex items-start gap-[16px]">
      <SectionTable protocols={protocolsCommunity} />
      <SectionProtocolDetail
        protocols={protocolsCommunity}
        totalVotes={toObject(round)?.totalVotes}
      />
    </div>
  );
};

export default CommunityPage;
