import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowsDownUp,
  DotsThree,
  EyeSlash,
  PencilSimpleLine,
  TrashSimple,
} from "@phosphor-icons/react";
import Image from "next/image";

export const columns = (handleDelete) => [
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
    accessorKey: "files",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-[150px]">
        <AspectRatio ratio={3 / 2} className="bg-transparent">
          <Image
            src={row.original.files.url}
            className="rounded-xl h-full w-full object-cover"
            alt={row.original.files.name}
            fill
          />
        </AspectRatio>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="w-[400px]">
        <p className="text-base font-semibold text-ellipsis overflow-hidden text-nowrap">
          {row.original.title}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <div
        className="flex gap-2 items-center cursor-pointer w-fit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowsDownUp className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-green-600 text-base">
        {row.original.category.name}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div
        className="flex gap-2 items-center cursor-pointer w-fit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowsDownUp className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <span className="text-base">{row.original.date}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div
        className="flex gap-2 items-center cursor-pointer w-fit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowsDownUp className="h-4 w-4" />
      </div>
    ),
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
    cell: ({ row }) => (
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
          <DropdownMenuItem
            onClick={() => handleDelete(row.original.id)}
            className="gap-2 text-red-500 focus:text-red-600 focus:bg-red-50"
          >
            <TrashSimple className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
