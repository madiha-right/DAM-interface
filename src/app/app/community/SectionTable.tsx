"use client";

import React from "react";
import { ProtocolCommunityType } from "@/actions/protocols";
import { useCandidates, useToggleCandidateList } from "@/hooks/global/useCandidates";
import DataTable from "@/app/app/DataTable";
import { columns } from "./Columns";
import CandidatesTable from "./CandidatesTable";
import { candidatesColumns } from "./CandidatesColumns";

interface IProps {
  protocols: ProtocolCommunityType[];
}

const SectionTable: React.FC<IProps> = ({ protocols }) => {
  const [isOpenCandidateList] = useToggleCandidateList();
  const [candidates] = useCandidates();

  return (
    <section className="w-full max-w-[662px]">
      {isOpenCandidateList ? (
        <CandidatesTable columns={candidatesColumns} data={candidates} />
      ) : (
        <DataTable columns={columns} data={protocols} from="communityStream" />
      )}
    </section>
  );
};

export default SectionTable;
