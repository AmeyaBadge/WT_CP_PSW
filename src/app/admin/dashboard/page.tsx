import { checkApproval } from "@/actions/admin/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const AdminHomePage = async () => {
  await checkApproval();
  return <div>AdminHomePage</div>;
};

export default AdminHomePage;
