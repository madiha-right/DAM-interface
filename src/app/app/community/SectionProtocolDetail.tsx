"use client";

import React from "react";
import { cn } from "@/lib/shadcn";
import type { IProtocolWithStat } from "@/actions/protocols";
import { useToast } from "@/hooks/useToast";
import { useCandidates, useToggleCandidateList } from "@/hooks/global/useCandidates";
import { useSelectedRowId } from "@/hooks/global/useSelectedRowId";
import { Button } from "@/components/ui/Button";
import ProtocolDetailCard from "./ProtocolDetailCard";
import DialogVoteButton from "./DialogVoteButton";

interface IProps {
  protocols: IProtocolWithStat[];
  totalVotes?: bigint;
}

const SectionProtocolDetail: React.FC<IProps> = ({ protocols, totalVotes }) => {
  const [selectedRowId] = useSelectedRowId();
  const [candidates, setCandidates] = useCandidates();
  const [isOpenCandidateList] = useToggleCandidateList();
  const { toast, dismiss } = useToast();
  const selectedProtocol = protocols.find((item) => item.protocol._id === selectedRowId);

  const totalBallot = candidates.reduce((acc, candidate) => acc + (candidate.power.ballot || 0), 0);

  const isAlreadyInCandidateList = () => {
    if (!selectedProtocol || candidates.length === 0) {
      return false;
    }
    return candidates.some((candidate) => candidate.protocol._id === selectedProtocol.protocol._id);
  };

  const resetVotes = () => {
    setCandidates((candidates) =>
      candidates.map((candidate) => ({
        ...candidate,
        power: { ballot: 0, weight: 0 },
      })),
    );
  };

  const handleClickAddToCandidateList = () => {
    if (!selectedProtocol || isAlreadyInCandidateList()) {
      return;
    }

    setCandidates((prev) => [...prev, { ...selectedProtocol, power: { ballot: 0, weight: 0 } }]);
    toast({
      title: `Added "${selectedProtocol.protocol.name}" to candidate list`,
      description: "You can view your candidate list in the candidate tab",
    });
    setTimeout(() => {
      dismiss();
    }, 3000);
  };

  const handleClickReset = () => {
    if (totalBallot === 0) {
      return;
    }

    resetVotes();
  };

  return (
    <section className={cn(!isOpenCandidateList && "pt-[45px]", "w-full max-w-[436px]")}>
      <ProtocolDetailCard
        protocol={selectedProtocol?.protocol}
        isAlreadyInCandidateList={isAlreadyInCandidateList()}
        isOpenCandidateList={isOpenCandidateList}
        handleClickAddToCandidateList={handleClickAddToCandidateList}
      />
      {isOpenCandidateList && (
        <div className="mt-[20px] flex gap-[20px]">
          <DialogVoteButton
            candidates={candidates}
            disabled={totalBallot === 0}
            totalVotes={totalVotes}
          />
          <Button
            variant="outline"
            className="h-[41px] flex-1 rounded-xl"
            disabled={totalBallot === 0}
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
