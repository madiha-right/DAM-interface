"use client";

import React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { cn } from "@/lib/shadcn";
import { useSelectedRowId } from "@/hooks/global/useSelectedRowId";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"; // prettier-ignore
import { ColumnKeys } from "@/utils/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const CandidatesTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
  const { columns, data } = props;
  const [selectedRowId, setSelectedRowId] = useSelectedRowId();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getRowId: (row) => (row as Record<"id", string>).id,
  });

  return (
    <div className="rounded-xl border shadow-md">
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.id !== ColumnKeys.VoteProportion && "px-[30px]",
                      header.id === ColumnKeys.VoteWeight && "text-center",
                      "h-[45px] text-xs font-medium text-muted-foreground",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={
                  row.id === selectedRowId ? "bg-border hover:bg-border" : "cursor-pointer"
                }
                onClick={() => setSelectedRowId(row.id)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id !== ColumnKeys.VoteProportion && "px-[30px]",
                        cell.column.id === ColumnKeys.VoteWeight && "text-center",
                        "h-[56px] text-sm font-medium",
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidatesTable;
