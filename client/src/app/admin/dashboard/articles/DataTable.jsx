"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MagnifyingGlass,
  Plus,
  SpinnerGap,
  Trash,
} from "@phosphor-icons/react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { deleteMultipleProducts } from "@/lib/apiService";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function DataTable({ columns, data, loading }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [tableData, setTableData] = useState(data);
  const router = useRouter();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const hasSelectedRows = Object.values(rowSelection).length > 0;

  const handleDeleteAll = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length === 0) return;

    const selectedProductIds = selectedRows.map((row) => row.original.id);

    try {
      await deleteMultipleProducts(selectedProductIds);

      const updatedData = tableData.filter(
        (item) => !selectedProductIds.includes(item.id)
      );
      setTableData(updatedData);
      setRowSelection({});

      toast.success("Products deleted successfully");
    } catch (error) {
      toast.error(`Error deleting products: ${error.message}`);
    }
  };

  const handlePost = () => {
    router.push("/admin/dashboard/articles/new");
  };

  return (
    <div className="space-y-5 relative">
      <div className="space-y-5 -mt-5 sticky -top-5 pt-5 bg-neutral-50 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type article heading..."
              value={table.getColumn("title")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              Icon={MagnifyingGlass}
            />

            <Select
              onValueChange={(value) =>
                table
                  .getColumn("category")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
              value={table.getColumn("category")?.getFilterValue() ?? "all"}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
                <SelectSeparator />
                {Array.from(
                  new Set(data.map((item) => item.category.name))
                ).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
              value={table.getColumn("status")?.getFilterValue() ?? "all"}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectSeparator />
                {Array.from(new Set(data.map((item) => item.status))).map(
                  (status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center gap-2">
            <Button
              className="bg-neutral-50 text-green-600 border-2 border-dashed border-green-600 hover:bg-green-600/10 flex items-center gap-2 text-base font-semibold"
              onClick={handlePost}
            >
              <Plus weight="bold" className="w-5 h-5" /> <p>New Article</p>
            </Button>

            {hasSelectedRows && (
              <Button
                variant="destructive"
                className="bg-red-100 text-red-500 hover:text-neutral-50 flex items-center gap-2"
                onClick={handleDeleteAll}
              >
                <Trash className="w-5 h-5" /> <p>Delete Selected</p>
              </Button>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous Page
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next Page
            </Button>
          </div>
        </div>

        <Separator />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnerGap className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-2xl"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
