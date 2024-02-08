"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/shadcn";
import type { ProtocolCommunityType } from "@/actions/protocols";
import { getHeaderName, ColumnKeys } from "@/utils/table";
import { formatPercentage } from "@/utils/format";
import { IconMinusCircle, IconPlusCircle } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useCandidates } from "@/hooks/global/useCandidates";

export const candidatesColumns: ColumnDef<ProtocolCommunityType>[] = [
  {
    accessorKey: ColumnKeys.Name,
    header: getHeaderName(ColumnKeys.Name),
  },
  {
    accessorKey: ColumnKeys.Categories,
    header: getHeaderName(ColumnKeys.Categories),
  },
  {
    accessorKey: ColumnKeys.ReceivedWeight,
    accessorFn: (row) => row.vote.weight,
    header: getHeaderName(ColumnKeys.ReceivedWeight),
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue(ColumnKeys.ReceivedWeight));

      return <span>{formatPercentage(weight)}</span>;
    },
  },
  {
    accessorKey: ColumnKeys.VoteProportion,
    accessorFn: (row) => row.vote.proportion,
    header: getHeaderName(ColumnKeys.VoteProportion),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [, setCandidates] = useCandidates();
      const count = parseInt(row.getValue(ColumnKeys.VoteProportion) || "0");

      const handleClickDecrease = () => {
        if (count < 1) {
          return;
        }
        updateCandidates("decrease");
      };

      const handleClickIncrease = () => {
        updateCandidates("increase");
      };

      const updateCandidates = (direction: "increase" | "decrease") => {
        const num = direction === "increase" ? 1 : -1;

        setCandidates((candidates) => {
          const totalProportions = candidates.reduce(
            (acc, candidate) => acc + (candidate.vote.proportion || 0),
            0,
          );

          const newCandidates = candidates.map((candidate) => {
            if (candidate.name === row.getValue(ColumnKeys.Name)) {
              const newProportion = (candidate.vote.proportion || 0) + num;
              const newWeight = newProportion / (totalProportions + num);

              return {
                ...candidate,
                vote: { ...candidate.vote, proportion: newProportion, weight: newWeight },
              };
            }

            const newWeight = (candidate.vote.proportion || 0) / (totalProportions + num);
            return { ...candidate, vote: { ...candidate.vote, weight: newWeight } };
          });

          return newCandidates;
        });
      };

      return (
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            className="p-0"
            disabled={count < 1}
            onClick={handleClickDecrease}
          >
            <IconMinusCircle />
          </Button>
          <span className={cn(count < 1 && "text-muted-foreground", "min-w-[40px] text-center")}>
            {count}
          </span>
          <Button type="button" variant="ghost" className="p-0" onClick={handleClickIncrease}>
            <IconPlusCircle />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: ColumnKeys.VoteWeight,
    header: getHeaderName(ColumnKeys.VoteWeight),
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue(ColumnKeys.VoteWeight) || "0");

      return <span>{formatPercentage(weight)}</span>;
    },
  },
];
