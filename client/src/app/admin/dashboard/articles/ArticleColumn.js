import defaultImage from "@/assets/heroLeaf.svg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ArrowsDownUp,
  DotsThree,
  Eye,
  EyeSlash,
  PencilSimpleLine,
  TrashSimple,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const columns = (handleDelete, handleStatus) => [
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
            src={row?.original?.files?.url || defaultImage}
            className="rounded-xl h-auto w-auto object-cover border"
            alt="Image Article"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
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
          {row?.original?.title}
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
        {row?.original?.category?.name}
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
    cell: ({ row }) => <span className="text-sm">{row.original.date}</span>,
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
        status === "draft"
          ? "bg-yellow-500/15 w-fit px-3 py-1 rounded-full text-yellow-500"
          : status === "hidden"
          ? "bg-red-500/15 w-fit px-3 py-1 rounded-full text-red-500"
          : "bg-green-600/15 w-fit px-3 py-1 rounded-full text-green-600";
      return (
        <span
          className={`flex items-center gap-2 font-medium ${statusClasses}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              status === "draft"
                ? "bg-yellow-500"
                : status === "hidden"
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
      const [dialogOpen, setDialogOpen] = useState(false);

      const handleDeleteClick = () => {
        handleDelete(row.original.id);
        setDialogOpen(false);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="rounded-full">
                <DotsThree className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2 text-neutral-500" asChild>
                <Link
                  href={`/admin/dashboard/articles/${row?.original?.id}/edit`}
                >
                  <PencilSimpleLine className="h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-neutral-500"
                onClick={() => {
                  handleStatus(row?.original?.id, row?.original?.status);
                }}
              >
                {row.original.status === "hidden" ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeSlash className="h-4 w-4" />
                )}
                {row.original.status === "hidden" ? "Visible" : "Hidden"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDialogOpen(true)}
                className="gap-2 text-red-500 focus:text-red-600 focus:bg-red-50"
              >
                <TrashSimple className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <p className="text-xl font-medium">Confirm Deletion</p>
                </DialogTitle>
                <Separator />
                <DialogDescription>
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteClick}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
