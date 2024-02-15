import React, { useState } from "react";
import { type Address, useAccount } from "wagmi";
import {
  useCandidates,
  useToggleCandidateList,
  type ICandidate,
} from "@/hooks/global/useCandidates";
import { useVotingPower } from "@/hooks/votes/useVotingPower";
import { useSignVotes } from "@/hooks/votes/useSignVotes";
import { useCastVotes } from "@/hooks/votes/useCastVotes";
import { formatPercentage, formatCount } from "@/utils/format";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import IconInfo from "@/components/icons/IconInfo";
import Spinner from "@/components/ui/Spinner";
import IconExternalLink from "@/components/icons/IconExternalLink";

interface IProps {
  candidates: ICandidate[];
  roundId: number;
  snapshotBlockNumber: bigint;
  disabled: boolean;
}

const timestamp = BigInt(Math.floor(Date.now() / 1000));

const DialogVoteButton: React.FC<IProps> = (props) => {
  const { roundId, candidates, disabled, snapshotBlockNumber } = props;
  const account = useAccount();
  const votingPower = useVotingPower(
    { block: snapshotBlockNumber, address: "0xbc66065e9640Df94338c6956297ca90ec116651d" },
    // { block: snapshotBlockNumber, address: account.address as Address }, // TODO:
    { enabled: false },
  );

  const choices = candidates.map((candidate) => ({
    protocol: candidate.protocol.name,
    votes: BigInt(candidate.power.ballot),
    id: candidate.protocol._id.toString(),
  }));
  const signVotes = useSignVotes({
    from: account.address as Address,
    timestamp,
    roundId,
    choices,
  });
  const castVotes = useCastVotes();
  const [, setCandidates] = useCandidates();
  const [, toggleCandidateList] = useToggleCandidateList();
  const [isOpen, setIsOpen] = useState(false);

  const votesCount = formatCount(
    votingPower.data?.delegates.length === 0
      ? "0"
      : (votingPower.data?.delegates[0].votes.toString() as string),
  );
  const choice =
    candidates.length === 0
      ? ""
      : candidates
          .filter((candidate) => (candidate.power.ballot as number) > 0)
          .map((candidate) => {
            return `${formatPercentage(candidate.power.weight)} for ${candidate.protocol.name}`;
          })
          .join(", ");
  const snapshot = formatCount(snapshotBlockNumber.toString());

  const handleClickConfirm = async () => {
    const hexSignature = await signVotes.writeAsync();
    castVotes.mutate(
      {
        hexSignature,
        message: {
          from: account.address as Address,
          timestamp,
          round: roundId,
          choice: choices,
          app: "DAM",
        },
      },
      {
        onSuccess: () => {
          /**
           * TODO:
           * 1. update getRound and every actions to use react query to refetch the round data,
           * 2. detailed error message might need for double voting, invalid round, etc.
           */

          toggleCandidateList();
          setCandidates([]);
          setIsOpen(false);
        },
        onError: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-[41px] flex-1 rounded-xl bg-mantle-teal hover:bg-mantle-pale"
          disabled={disabled}
          onClick={() => votingPower.refetch()}
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
            <dd className="text-sm font-medium">{snapshot}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="relative text-nowrap text-sm">
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
            <dd className="text-right text-sm font-medium">
              {votingPower.isLoading ? <Spinner /> : `${votesCount} Votes`}
            </dd>
          </div>
        </dl>
        {votingPower.data &&
          (votingPower.data.delegates.length === 0 ||
            Number(votingPower.data?.delegates[0].votes) === 0) && (
            <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
              {`Oops, it seems you don't have any voting power at block
              ${snapshot}.`}
              <Button asChild variant="ghost" className="ml-[6px] h-auto p-[2px] text-sm">
                <a href="https://github.com/snapshot-labs/snapshot/discussions/767" target="_blank">
                  <span>Learn more</span>
                  <span className="ml-[2px] translate-y-[1px]">
                    <IconExternalLink />
                  </span>
                </a>
              </Button>
            </div>
          )}
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            className="h-[46px] flex-1 rounded-xl bg-mantle-teal hover:bg-mantle-pale"
            disabled={
              votingPower.isLoading ||
              votingPower.data?.delegates.length === 0 ||
              signVotes.isLoading
            }
            onClick={handleClickConfirm}
          >
            {signVotes.isLoading && <Spinner className="mr-[6px]" />}
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
