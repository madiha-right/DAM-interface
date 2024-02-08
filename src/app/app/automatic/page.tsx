import { NextPage } from "next";
import type { Metadata } from "next";
import { getProtocols } from "@/actions/protocols";
import { columns } from "./Columns";
import DataTable from "../DataTable";
import { StreamType } from "@/models/Protocol";

export const metadata: Metadata = {
  title: "DAM | Automatic",
  description: "Distribution based on Auto-Metric until the end of the round.",
};

const AutomaticPage: NextPage = async () => {
  const protocols = await getProtocols();
  const protocolsAuto = protocols.filter(
    (item) => item.protocol.type === StreamType.Auto || item.protocol.type === StreamType.Both,
  );

  return (
    <>
      <DataTable columns={columns} data={protocolsAuto} from="autoStream" />
    </>
  );
};

export default AutomaticPage;
