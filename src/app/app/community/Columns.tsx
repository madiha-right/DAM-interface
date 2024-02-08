"use client";

import { ColumnDef } from "@tanstack/react-table";
import { getCurrentRoundUpstream, getRound } from "@/actions/rounds";
import type { IProtocolWithStat } from "@/actions/protocols";
import { getHeaderName, ColumnKeys } from "@/utils/table";
import { formatPercentage } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import ArrowUpDown from "@/components/icons/IconArrowUpDown";

export const columns: ColumnDef<IProtocolWithStat>[] = [
  {
    accessorKey: ColumnKeys.Name,
    header: getHeaderName(ColumnKeys.Name),
  },
  {
    accessorKey: ColumnKeys.Categories,
    header: getHeaderName(ColumnKeys.Categories),
    cell: ({ row }) => {
      const categories = row.getValue(ColumnKeys.Categories) as string[];
      const category = categories[0];

      return <span>{category}</span>;
    },
  },
  {
    accessorKey: ColumnKeys.VotesProtocol,
    accessorFn: (row) => row.stat.votes?.total,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.VotesProtocol)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: async ({ row }) => {
      const roundUpstream = await getCurrentRoundUpstream();
      const round = await getRound(roundUpstream?.id as number);
      const totalVotes = round?.totalVotes;
      const votesProtocol = BigInt(row.getValue(ColumnKeys.VotesProtocol));
      const weight = totalVotes ? Number(votesProtocol / totalVotes) : 0;

      return <span>{formatPercentage(weight)}</span>;
    },
  },
];
