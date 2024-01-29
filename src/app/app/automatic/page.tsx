import { NextPage } from "next";
import type { Metadata } from "next";
import { getProtocolsAuto } from "@/actions/protocols";
import { columns } from "./Columns";
import DataTable from "../DataTable";

export const metadata: Metadata = {
  title: "DAM | Automatic",
  description: "Distribution based on Auto-Metric until the end of the round.",
};

const AutomaticPage: NextPage = async () => {
  const protocols = await getProtocolsAuto();

  return (
    <>
      <DataTable columns={columns} data={protocols} from="autoStream" />
    </>
  );
};

export default AutomaticPage;
