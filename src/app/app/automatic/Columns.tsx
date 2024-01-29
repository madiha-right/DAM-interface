"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { ProtocolAutoType } from "@/actions/protocols";
import { formatCount, formatNumberToDollar } from "@/utils/format";
import { getHeaderName, ColumnKeys } from "@/utils/table";
import { Button } from "@/components/ui/Button";
import ArrowUpDown from "@/components/icons/IconArrowUpDown";

export const columns: ColumnDef<ProtocolAutoType>[] = [
  {
    accessorKey: ColumnKeys.Name,
    header: getHeaderName(ColumnKeys.Name),
  },
  {
    accessorKey: ColumnKeys.Category,
    header: getHeaderName(ColumnKeys.Category),
  },
  {
    accessorKey: ColumnKeys.Tvl,
    header: getHeaderName(ColumnKeys.Tvl),
    cell: ({ row }) => {
      const tvl = parseFloat(row.getValue(ColumnKeys.Tvl));
      const formatted = formatNumberToDollar(tvl);

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: ColumnKeys.TxCount,
    header: getHeaderName(ColumnKeys.TxCount),
    cell: ({ row }) => {
      const tvl = parseFloat(row.getValue(ColumnKeys.TxCount));
      const formatted = formatCount(tvl);

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: ColumnKeys.MilesToday,
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
