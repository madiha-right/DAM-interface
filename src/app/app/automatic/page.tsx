import { NextPage } from "next";
import type { Metadata } from "next";
import { getProtocols } from "@/actions/protocols";
import { columns } from "./Columns";
import DataTable from "../DataTable";

export const metadata: Metadata = {
  title: "DAM | Automatic",
  description: "Distribution based on Auto-Metric until the end of the round.",
};

const AutomaticPage: NextPage = async () => {
  const protocols = await getProtocols();

  return (
    <>
      <DataTable columns={columns} data={protocols} hasVisibility />
    </>
  );
};

export default AutomaticPage;
