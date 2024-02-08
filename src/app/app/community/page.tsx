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
 * 1. add routes api to add protocols to db - add both protocols and round(protocol ids)
 * 2. empty db and test it on ui
 * 3. implement vote off-chain ui
 * 4. vote off-chain api + db
 * - get voting power from https://api.delegatevote.mantle.xyz/graphql?query=query+GetDelegate+%7B%0A++delegates%28block%3A+19455119%2C+where%3A+%7Bid%3A+%220xbc66065e9640Df94338c6956297ca90ec116651d%22%7D%29+%7B%0A++++votes%0A++++id%0A++++bitVotes%0A++++l2MntVotes%0A++++mntVotes%0A++%7D%0A%7D#
 */
const CommunityPage: NextPage = async () => {
  const currentRound = await getCurrentRoundUpstream();
  const round = await getRound(currentRound?.id as number);
  const protocols = (round?.protocols as IProtocolWithStat[]) || [];
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
