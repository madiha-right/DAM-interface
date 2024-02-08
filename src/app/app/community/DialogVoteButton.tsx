import React from "react";
import type { ICandidate } from "@/hooks/global/useCandidates";
import { formatPercentage } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import IconInfo from "@/components/icons/IconInfo";

interface IProps {
  candidates: ICandidate[];
  disabled: boolean;
  totalVotes?: bigint;
}

const DialogVoteButton: React.FC<IProps> = ({ candidates, disabled, totalVotes }) => {
  const choice =
    candidates.length === 0
      ? ""
      : candidates
          .filter((candidate) => (candidate.power.ballot as number) > 0)
          .map((candidate) => {
            const weight = totalVotes
              ? Number((candidate.stat.votes?.total || BigInt(0)) / totalVotes)
              : 0;
            return `${formatPercentage(weight)} for ${candidate.protocol.name}`;
          })
          .join(", ");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-[41px] flex-1 rounded-xl bg-mantle-teal hover:bg-mantle-pale"
          disabled={disabled}
        >
          Vote
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-[30px] !rounded-[20px] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Cast your vote</DialogTitle>
        </DialogHeader>
        <dl>
          <div className="mb-[2px] flex justify-between last:mb-0">
            <dt className="text-sm">Choice</dt>
            <dd className="max-w-[200px] truncate text-sm font-medium">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{choice}</span>
                  </TooltipTrigger>
                  <TooltipContent align="start" className="max-w-[300px] text-wrap">
                    {choice}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dd>
          </div>
          <div className="mb-[2px] flex justify-between">
            <dt className="relative text-sm">Snapshot</dt>
            <dd className="text-sm font-medium">blocknumber</dd>
          </div>
          <div className="flex justify-between">
            <dt className="relative text-sm">
              Your voting power
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="absolute -right-[3px] top-0 translate-x-full translate-y-1/2"
                  >
                    <span>
                      <IconInfo />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>MNT, L2-MNT, BIT Aggregated</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd className="text-sm font-medium">blahbalh Votes</dd>
          </div>
        </dl>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            className="h-[46px] flex-1 rounded-xl bg-mantle-teal hover:bg-mantle-pale"
          >
            Confirm
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="h-[46px] flex-1 rounded-xl">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVoteButton;
