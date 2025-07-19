import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  FileTextIcon,
  PlusCircle,
  UsersIcon,
} from "lucide-react";
import { getAllDepartments } from "@/actions/admin/department.action";

import Link from "next/link";
import AdminDepartmentCard from "@/components/admin/AdminDepartmentCard";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { checkApproval, isAdmin } from "@/actions/admin/user.action";

const DepartmentsPage = async () => {
  await checkApproval();

  const departments = await getAllDepartments();
  const admin = await isAdmin();

  return (
    <>
      <div className="w-full space-y-8">
        <div className="flex justify-between items-center">
          <Heading
            title="Departments"
            description="Manage your departments and their details"
          />
          {admin && (
            <Button variant={"outline"} className="cursor-pointer" asChild>
              <Link href="/admin/dashboard/departments/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Department
              </Link>
            </Button>
          )}
        </div>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <Link
              href={`/admin/dashboard/departments/${department.id}`}
              key={department.id}
            >
              <AdminDepartmentCard department={department} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DepartmentsPage;
