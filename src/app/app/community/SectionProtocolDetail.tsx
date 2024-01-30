"use client";

import React from "react";
import { cn } from "@/lib/shadcn";
import { ProtocolCommunityType } from "@/actions/protocols";
import { useToast } from "@/hooks/useToast";
import { useCandidates, useToggleCandidateList } from "@/hooks/global/useCandidates";
import { useSelectedRowId } from "@/hooks/global/useSelectedRowId";
import { Button } from "@/components/ui/Button";
import ProtocolDetailCard from "./ProtocolDetailCard";
import DialogVoteButton from "./DialogVoteButton";

interface IProps {
  protocols: ProtocolCommunityType[];
}

const SectionProtocolDetail: React.FC<IProps> = ({ protocols }) => {
  const [selectedRowId] = useSelectedRowId();
  const [candidates, setCandidates] = useCandidates();
  const [isOpenCandidateList] = useToggleCandidateList();
  const { toast, dismiss } = useToast();
  const selectedProtocol = protocols.find((protocol) => protocol.id === selectedRowId);

  const totalProportions = candidates.reduce(
    (acc, candidate) => acc + (candidate.voteProportion || 0),
    0,
  );

  const isAlreadyInCandidateList = () => {
    if (!selectedProtocol || candidates.length === 0) {
      return false;
    }
    return candidates.some((candidate) => candidate.id === selectedProtocol.id);
  };

  const resetVotes = () => {
    setCandidates((candidates) =>
      candidates.map((candidate) => ({ ...candidate, voteProportion: 0, voteWeight: 0 })),
    );
  };

  const handleClickAddToCandidateList = () => {
    if (!selectedProtocol || isAlreadyInCandidateList()) {
      return;
    }

    setCandidates((prev) => [...prev, selectedProtocol]);
    toast({
      title: `Added "${selectedProtocol.name}" to candidate list`,
      description: "You can view your candidate list in the candidate tab",
    });
    setTimeout(() => {
      dismiss();
    }, 3000);
  };

  const handleClickReset = () => {
    if (totalProportions === 0) {
      return;
    }

    resetVotes();
  };

  return (
    <section className={cn(!isOpenCandidateList && "pt-[45px]", "w-full max-w-[436px]")}>
      <ProtocolDetailCard
        protocol={selectedProtocol || null}
        isAlreadyInCandidateList={isAlreadyInCandidateList()}
        isOpenCandidateList={isOpenCandidateList}
        handleClickAddToCandidateList={handleClickAddToCandidateList}
      />
      {isOpenCandidateList && (
        <div className="mt-[20px] flex gap-[20px]">
          <DialogVoteButton candidates={candidates} disabled={totalProportions === 0} />
          <Button
            variant="outline"
            className="h-[41px] flex-1 rounded-xl"
            disabled={totalProportions === 0}
            onClick={handleClickReset}
          >
            Reset
          </Button>
        </div>
      )}
    </section>
  );
};

export default SectionProtocolDetail;
