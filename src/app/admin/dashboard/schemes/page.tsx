import { checkApproval, isAdmin } from "@/actions/admin/user.action";
import { getSchemes } from "@/actions/admin/scheme.action";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import ManageSchemesTable from "./components/ManageSchemesTable";

export const metadata: Metadata = {
  title: "Schemes",
};

function transformData(inputArray: Awaited<ReturnType<typeof getSchemes>>) {
  return inputArray.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    shortDesc: item.shortDesc,
    type: item.type,
    departmentName: item.department?.name ?? "",
    departmentId: item.department?.id ?? "",
    deadline: item.deadline,
    isExpired: item.deadline ? new Date(item.deadline) < new Date() : false,
    image: item.image,
    images: item.images || [],
  }));
}

const SchemesPage = async () => {
  // Check approval and authentication
  await checkApproval();

  const rawSchemes = await getSchemes();
  const schemes = transformData(rawSchemes);
  const isUserAdmin = await isAdmin();

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Heading
          title="Schemes Management"
          description={
            isUserAdmin
              ? "Manage all government schemes across departments. Create, edit, and monitor scheme information."
              : "Manage schemes for your department. Create and edit scheme information for your assigned department."
          }
        />
        <Link href="/admin/dashboard/schemes/create">
          <Button>Create New Scheme</Button>
        </Link>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">
              {isUserAdmin ? "All Schemes" : "Department Schemes"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {schemes.length} scheme(s) found
            </p>
          </div>
        </div>

        <ManageSchemesTable schemes={schemes} />
      </div>
    </div>
  );
};

export default SchemesPage
