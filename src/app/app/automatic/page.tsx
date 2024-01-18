import { NextPage } from "next";
import type { Metadata } from "next";
import { DAM_BASE_URL } from "@/utils/site";
import { columns } from "./Columns";
import DataTable from "../DataTable";
import type { ProtocolDataType } from "./types";

export const metadata: Metadata = {
  title: "DAM | Automatic",
  description: "Distribution based on Auto-Metric until the end of the round.",
};

async function getProtocols(): Promise<ProtocolDataType[]> {
  const res = await fetch(DAM_BASE_URL + "/app/automatic/api");
  const { data } = await res.json();

  return data;
}

const AutomaticPage: NextPage = async () => {
  const protocols = await getProtocols();

  return (
    <>
      <DataTable columns={columns} data={protocols} hasVisibility />
    </>
  );
};

export default AutomaticPage;
