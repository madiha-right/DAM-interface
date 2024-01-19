"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatNumberWithUnit, formatPercentage } from "@/utils/format";
import { getHeaderName, ColumnKeys } from "@/utils/table";
import { Button } from "@/components/ui/Button";
import ArrowUpDown from "@/components/icons/IconArrowUpDown";
import type { ProtocolDataType } from "@/app/app/automatic/types";

export const columns: ColumnDef<ProtocolDataType>[] = [
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
      const formatted = formatNumberWithUnit(tvl);

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: ColumnKeys.TxCount,
    header: getHeaderName(ColumnKeys.TxCount),
    cell: ({ row }) => {
      const tvl = parseFloat(row.getValue(ColumnKeys.TxCount));
      const formatted = formatNumberWithUnit(tvl);

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
      const mileTodayGrowth = parseFloat(row.getValue(ColumnKeys.MilesToday));

      return (
        <span className={mileTodayGrowth >= 0 ? "text-constructive" : "text-destructive"}>
          {formatPercentage(mileTodayGrowth)}
        </span>
      );
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
      const mileAccGrowth = parseFloat(row.getValue(ColumnKeys.MilesAccumulated));

      return (
        <span className={mileAccGrowth >= 0 ? "text-constructive" : "text-destructive"}>
          {formatPercentage(mileAccGrowth)}
        </span>
      );
    },
  },
];
