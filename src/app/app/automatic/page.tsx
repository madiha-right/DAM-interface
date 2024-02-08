import { NextPage } from "next";
import type { Metadata } from "next";
import { getRound, queryCurrentRound } from "@/actions/rounds";
import { columns } from "./Columns";
import DataTable from "../DataTable";

export const metadata: Metadata = {
  title: "DAM | Automatic",
  description: "Distribution based on Auto-Metric until the end of the round.",
};

const AutomaticPage: NextPage = async () => {
  const currentRound = await queryCurrentRound();
  const protocols = await getRound(currentRound?.id as number);

  return (
    <>
      <DataTable columns={columns} data={protocols} from="autoStream" />
    </>
  );
};

export default AutomaticPage;
