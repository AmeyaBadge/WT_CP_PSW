import {
  checkApproval,
  getAllUsers,
  isAdmin,
} from "@/actions/admin/user.action";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import ApproveUsersDialog from "@/app/admin/dashboard/users/components/ApproveUsersDialog";
import ManageUsersTable from "./components/ManageUsersTable";
import InviteUserDialog from "./components/InviteUserDialog";

export const metadata: Metadata = {
  title: "Users",
};

function transformData(inputArray: Awaited<ReturnType<typeof getAllUsers>>) {
  return inputArray.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    email: item.email,
    departmentName: item.department?.name ?? "",
    departmentId: item.department?.id ?? "",
  }));
}

const ManageUsers = async () => {
  // Protect the page from users who are not admins
  if (!(await isAdmin())) redirect("/403");

  await checkApproval();

  const rawUsers = await getAllUsers();
  const approvedUsers = rawUsers.filter((user) => user.approved);
  const unapprovedUsers = rawUsers.filter((user) => !user.approved);
  const users = transformData(approvedUsers);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Heading
          title="User Management"
          description="Manage users associated with the departments. Approve only known users as this exposes the systems to external users."
        />
        <ApproveUsersDialog />
        <InviteUserDialog />
      </div>
      <Separator />

      <div className="rounded-md border overflow-hidden">
        <ManageUsersTable users={approvedUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
