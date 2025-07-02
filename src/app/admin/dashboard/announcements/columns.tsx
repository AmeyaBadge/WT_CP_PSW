"use client";

import { deleteAnnouncement } from "@/actions/announcement.action";
import CreateAnnouncementDialog from "@/components/admin/CreateAnnouncementDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export type AnnouncementRow = {
  id: string;
  title: string;
  content: string;
  type: "Alert" | "Update" | "Notice";
  creator: string;
  createdAt: string;
};

export const announcementColumns: ColumnDef<AnnouncementRow>[] = [
  {
    accessorKey: "title",
    header: "Announcement",
    maxSize: 100,
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <span className="block max-w-2xl whitespace-pre-wrap break-words">
          {title}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span>{row.getValue("type")}</span>,
  },
  {
    accessorKey: "creator",
    header: "Created By",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id, title, type, content } = row.original;

      return (
        <div className="flex gap-2">
          <CreateAnnouncementDialog
            update
            updateId={id}
            updateType={type}
            updateTitle={title}
            updateContent={content}
          />

          <AlertDialog>
            <AlertDialogTrigger>
              <div className="rounded-sm p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10! ">
                <Trash2 className="size-4" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  announcement.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const res = await deleteAnnouncement(id);
                    if (res) {
                      toast.success("Deleted Successfully");
                    } else {
                      toast.error("Something went wrong");
                    }
                  }}
                >
                  {/* <Button variant={"outline"} asChild> */}
                  Continue
                  {/* </Button> */}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
