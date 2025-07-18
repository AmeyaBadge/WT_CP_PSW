// "use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ShieldPlus } from "lucide-react";
import { getAllUsers } from "@/actions/admin/user.action";
import { Separator } from "../../../../../components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import RemoveUserForm from "./RemoveUserButton";
import ApproveUserButton from "./ApproveUserButton";

const ApproveUsersDialog = async () => {
  const unApprovedUsers = await getAllUsers(true);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          <ShieldPlus />
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle>Pending Users</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="px-4! text-center">Image</TableHead>
                  <TableHead className="px-4!">Name</TableHead>
                  <TableHead className="px-4!">Email</TableHead>
                  <TableHead className="px-4! text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unApprovedUsers.length > 0 ? (
                  unApprovedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-4!">
                        <Avatar className="mx-auto">
                          <AvatarImage src={user.image} alt="Avatar" />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="px-4!">{user.name}</TableCell>
                      <TableCell className="px-4!">{user.email}</TableCell>
                      <TableCell className="px-4!">
                        <div className="flex justify-around mx-auto">
                          {/* Approve Button */}
                          <ApproveUserButton dbId={user.id} />

                          {/* TODO : Remove user Dialog */}
                          <RemoveUserForm />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No users to approve
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveUsersDialog;
