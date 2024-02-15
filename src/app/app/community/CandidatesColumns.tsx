"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/shadcn";
import { useCandidates, type ICandidate } from "@/hooks/global/useCandidates";
import { getHeaderName, ColumnKeys } from "@/utils/table";
import { formatPercentage } from "@/utils/format";
import { IconMinusCircle, IconPlusCircle } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export const candidatesColumns: ColumnDef<ICandidate>[] = [
  {
    accessorKey: ColumnKeys.Name,
    accessorFn: (row) => row.protocol.name,
    header: getHeaderName(ColumnKeys.Name),
  },
  {
    accessorKey: ColumnKeys.Categories,
    accessorFn: (row) => row.protocol.categories,
    header: getHeaderName(ColumnKeys.Categories),
  },
  {
    accessorKey: ColumnKeys.Received,
    accessorFn: (row) => row.stat.votes?.weight,
    header: getHeaderName(ColumnKeys.Received),
    cell: ({ row }) => {
      const weight = row.getValue(ColumnKeys.Received) as number;
      return <span>{formatPercentage(weight)}</span>;
    },
  },
  {
    accessorKey: ColumnKeys.PowerBallot,
    accessorFn: (row) => row.power.ballot,
    header: getHeaderName(ColumnKeys.PowerBallot),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [, setCandidates] = useCandidates();
      const count = parseInt(row.getValue(ColumnKeys.PowerBallot) || "0");

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
          const totalBallot =
            candidates.reduce((acc, candidate) => acc + (candidate.power.ballot || 0), 0) + num;

          const newCandidates = candidates.map((candidate) => {
            if (candidate.protocol.name === row.getValue(ColumnKeys.Name)) {
              const newBallot = (candidate.power.ballot || 0) + num;
              const newWeight = newBallot / totalBallot;

              return {
                ...candidate,
                power: { ...candidate.power, ballot: newBallot, weight: newWeight },
              };
            }

            const newWeight = (candidate.power.ballot || 0) / totalBallot;
            return { ...candidate, power: { ...candidate.power, weight: newWeight } };
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
    accessorKey: ColumnKeys.PowerWeight,
    accessorFn: (row) => row.power.weight,
    header: getHeaderName(ColumnKeys.PowerWeight),
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue(ColumnKeys.PowerWeight) || "0");
      return <span>{formatPercentage(weight)}</span>;
    },
  },
];
