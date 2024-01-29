import { NextPage } from "next";
import type { Metadata } from "next";
import { getProtocolsCommunity } from "@/actions/protocols";
import SectionProtocolDetail from "./SectionProtocolDetail";
import SectionTable from "./SectionTable";

export const metadata: Metadata = {
  title: "DAM | Community",
  description: "Distribution based on community gauge-voting until the end of round.",
};

/**
 * TODO:
 * 6. modal
 * 7. vote off-chain
 * 8. database
 */
const CommunityPage: NextPage = async () => {
  const protocols = getProtocolsCommunity();

  return (
    <div className="flex items-start gap-[16px]">
      <SectionTable protocols={protocols} />
      <SectionProtocolDetail protocols={protocols} />
    </div>
  );
};

export default CommunityPage;
