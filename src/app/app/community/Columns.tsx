"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatPercentage } from "@/utils/format";
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
    accessorKey: ColumnKeys.ReceivedWeight,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 text-xs"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" || !column.getIsSorted())
          }
        >
          {getHeaderName(ColumnKeys.ReceivedWeight)}
          <ArrowUpDown className="ml-[5px] stroke-muted-foreground transition-colors duration-150 group-hover:stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mileAccGrowth = parseFloat(row.getValue(ColumnKeys.ReceivedWeight));

      return <span>{formatPercentage(mileAccGrowth)}</span>;
    },
  },
];
