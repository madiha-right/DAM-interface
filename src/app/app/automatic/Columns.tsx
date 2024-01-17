/* eslint-disable no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/shadcn";
import { formatNumberWithUnit, formatPercentage } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import ArrowUpDown from "@/components/icons/ArrowUpDown";
import { get } from "http";

export enum ColumnKeys {
  Name = "name",
  Category = "category",
  Tvl = "tvl",
  TvlGrowth = "tvlGrowth",
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectType = {
  id: string;
  name: string;
  category: "Defi" | "Infrastructure" | "NFT" | "Tooling" | "Other";
  tvl: number;
  tvlGrowth: number;
};

export const getHeaderName = (key: ColumnKeys) => {
  switch (key) {
    case ColumnKeys.Name:
      return "Name";
    case ColumnKeys.Category:
      return "Category";
    case ColumnKeys.Tvl:
      return "TVL";
    case ColumnKeys.TvlGrowth:
      return "TVL Growth";
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
    accessorKey: ColumnKeys.TvlGrowth,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.TvlGrowth)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tvlGrowth = parseFloat(row.getValue(ColumnKeys.TvlGrowth));

      return (
        <span
          className={cn(tvlGrowth < 0 && "text-destructive", tvlGrowth > 0 && "text-constructive")}
        >
          {formatPercentage(tvlGrowth)}
        </span>
      );
    },
  },
];
