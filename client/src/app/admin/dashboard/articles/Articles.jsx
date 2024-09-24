"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowsDownUp,
  DotsThree,
  EyeSlash,
  MagnifyingGlass,
  PencilSimpleLine,
  Plus,
  Trash,
} from "@phosphor-icons/react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import articles from "../../../../data/articles.json";

const categoryOptions = [
  ...new Set(articles.map((article) => article.category)),
];
const statusOptions = [...new Set(articles.map((article) => article.status))];

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-[150px]">
        <AspectRatio ratio={3 / 2} className="bg-transparent">
          <Image
            src={row.original.files.url}
            className="rounded-xl h-full w-full object-cover"
            alt="article image"
            fill
          />
        </AspectRatio>
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <div className="w-[400px]">
        <p className="text-base font-semibold text-ellipsis overflow-hidden text-nowrap">
          {row.original.title}
        </p>
        <p className="text-sm text-ellipsis overflow-hidden line-clamp-3">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          variant="outline"
          className="flex gap-2 items-center cursor-pointer w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowsDownUp className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="text-green-600 text-base">{row.original.category}</span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          variant="outline"
          className="flex gap-2 items-center cursor-pointer w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowsDownUp className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <span className="text-base">{row.original.date}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          variant="outline"
          className="flex gap-2 items-center cursor-pointer w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowsDownUp className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const statusClasses =
        status === "Draft"
          ? "bg-yellow-500/15 w-fit px-3 py-1 rounded-full text-yellow-500"
          : status === "Hidden"
          ? "bg-red-500/15 w-fit px-3 py-1 rounded-full text-red-500"
          : "bg-green-600/15 w-fit px-3 py-1 rounded-full text-green-600";
      return (
        <span
          className={`flex items-center gap-2 font-medium ${statusClasses}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              status === "Draft"
                ? "bg-yellow-500"
                : status === "Hidden"
                ? "bg-red-500"
                : "bg-green-600"
            }`}
          ></span>
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="rounded-full">
              <span className="sr-only">Open menu</span>
              <DotsThree className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2 text-neutral-500">
              <PencilSimpleLine className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-neutral-500">
              <EyeSlash className="h-4 w-4" />
              Hide
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-600 focus:bg-red-50">
              <Trash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const table = useReactTable({
    data,
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

  const handleDelete = () => {
    console.log(Object.keys(rowSelection));
  };
  const hasSelectedRows = Object.values(rowSelection).length > 0;

  const handlePost = () => {
    router.push("/admin/dashboard/articles/post");
  };

  return (
    <div className="space-y-5 relative">
      <div className="space-y-5 -mt-5 sticky -top-5 pt-5 bg-neutral-50 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type article heading..."
              value={table.getColumn("details")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("details")?.setFilterValue(event.target.value)
              }
              Icon={MagnifyingGlass}
              className="w-[330px]"
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
                {categoryOptions.map((category) => (
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
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
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
                onClick={handleDelete}
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
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous Page
            </Button>
            <Button
              variant="outline"
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function ArticlePage() {
  return (
    <div>
      <DataTable columns={columns} data={articles} />
    </div>
  );
}
