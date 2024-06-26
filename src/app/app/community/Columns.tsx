"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { IProtocolWithStat } from "@/actions/protocols";
import { getHeaderName, ColumnKeys } from "@/utils/table";
import { formatPercentage } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import ArrowUpDown from "@/components/icons/IconArrowUpDown";

export const columns: ColumnDef<IProtocolWithStat>[] = [
  {
    accessorKey: ColumnKeys.Name,
    accessorFn: (row) => row.protocol.name,
    header: getHeaderName(ColumnKeys.Name),
  },
  {
    accessorKey: ColumnKeys.Categories,
    accessorFn: (row) => row.protocol.categories,
    header: getHeaderName(ColumnKeys.Categories),
    cell: ({ row }) => {
      const categories = row.getValue(ColumnKeys.Categories) as string[];
      const category = categories[0];
      return <span>{category}</span>;
    },
  },
  {
    accessorKey: ColumnKeys.Received,
    accessorFn: (row) => row.stat.votes?.weight,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.Received)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const weight = row.getValue(ColumnKeys.Received) as number;
      return <span>{formatPercentage(weight)}</span>;
    },
  },
];
