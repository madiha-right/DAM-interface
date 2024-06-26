"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { IProtocolWithStat } from "@/actions/protocols";
import { formatCount, formatNumberToDollar } from "@/utils/format";
import { getHeaderName, ColumnKeys } from "@/utils/table";
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
    accessorKey: ColumnKeys.Tvl,
    accessorFn: (row) => row.stat.tvl,
    header: getHeaderName(ColumnKeys.Tvl),
    cell: ({ row }) => {
      const tvl = parseFloat(row.getValue(ColumnKeys.Tvl));
      const formatted = formatNumberToDollar(tvl);
      return <>{formatted}</>;
    },
  },
  {
    accessorKey: ColumnKeys.TxCount,
    accessorFn: (row) => row.stat.txCount,
    header: getHeaderName(ColumnKeys.TxCount),
    cell: ({ row }) => {
      const txCount = parseFloat(row.getValue(ColumnKeys.TxCount));
      const formatted = formatCount(txCount);
      return <>{formatted}</>;
    },
  },
  {
    accessorKey: ColumnKeys.MilesToday,
    accessorFn: (row) => row.stat.miles.today,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.MilesToday)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const milesToday = parseFloat(row.getValue(ColumnKeys.MilesToday));
      const formatted = formatCount(milesToday);
      return <>{formatted}</>;
    },
  },
  {
    accessorKey: ColumnKeys.MilesAccumulated,
    accessorFn: (row) => row.stat.miles.accumulated,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.MilesAccumulated)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const milesAccumulated = parseFloat(row.getValue(ColumnKeys.MilesAccumulated));
      const formatted = formatCount(milesAccumulated);
      return <>{formatted}</>;
    },
  },
];
