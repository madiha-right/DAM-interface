import React from "react";
import { ProtocolCommunityType } from "@/actions/protocols";
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
  candidates: ProtocolCommunityType[];
  disabled: boolean;
}
/**
 * TODO:
 * 3. get voting power from https://api.delegatevote.mantle.xyz/graphql?query=query+GetDelegate+%7B%0A++delegates%28block%3A+19455119%2C+where%3A+%7Bid%3A+%220xbc66065e9640Df94338c6956297ca90ec116651d%22%7D%29+%7B%0A++++votes%0A++++id%0A++++bitVotes%0A++++l2MntVotes%0A++++mntVotes%0A++%7D%0A%7D#
 */
const DialogVoteButton: React.FC<IProps> = ({ candidates, disabled }) => {
  const choice = candidates
    .filter((candidate) => (candidate.voteWeight as number) > 0)
    .map((candidate) => `${formatPercentage(candidate.voteWeight as number)} for ${candidate.name}`)
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
