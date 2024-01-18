/* eslint-disable no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatNumberWithUnit, formatPercentage } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import ArrowUpDown from "@/components/icons/ArrowUpDown";

export enum ColumnKeys {
  Name = "name",
  Category = "category",
  Tvl = "tvl",
  TxCount = "txCount",
  MileToday = "mileToday",
  MileAccumulated = "mileAccumulated",
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectType = {
  id: string;
  name: string;
  category: "Defi" | "Infrastructure" | "NFT" | "Tooling" | "Other";
  tvl: number;
  txCount: number;
  mileToday: number;
  mileAccumulated: number;
};

export const getHeaderName = (key: ColumnKeys) => {
  switch (key) {
    case ColumnKeys.Name:
      return "Name";
    case ColumnKeys.Category:
      return "Category";
    case ColumnKeys.Tvl:
      return "TVL";
    case ColumnKeys.TxCount:
      return "Tx Count";
    case ColumnKeys.MileToday:
      return "Mile received today";
    case ColumnKeys.MileAccumulated:
      return "Mile Accumulated";
    default:
      return "Wrong Key";
  }
};

export const columns: ColumnDef<ProjectType>[] = [
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
    accessorKey: ColumnKeys.MileToday,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.MileToday)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mileTodayGrowth = parseFloat(row.getValue(ColumnKeys.MileToday));

      return (
        <span className={mileTodayGrowth >= 0 ? "text-constructive" : "text-destructive"}>
          {formatPercentage(mileTodayGrowth)}
        </span>
      );
    },
  },
  {
    accessorKey: ColumnKeys.MileAccumulated,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.MileAccumulated)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mileAccGrowth = parseFloat(row.getValue(ColumnKeys.MileAccumulated));

      return (
        <span className={mileAccGrowth >= 0 ? "text-constructive" : "text-destructive"}>
          {formatPercentage(mileAccGrowth)}
        </span>
      );
    },
  },
];
