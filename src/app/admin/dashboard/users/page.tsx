import { isAdmin } from "@/actions/admin/user.action";
import { redirect } from "next/navigation";
import React from "react";

const ManageUsers = async () => {
  // Protect the page from users who are not admins
  if (!(await isAdmin())) redirect("/403");

  return (
    <p>
      This is the protected admin dashboard restricted to users with the `admin`
      role.
    </p>
  );
};

export default ManageUsers;
