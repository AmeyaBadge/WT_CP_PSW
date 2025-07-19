import { getDepartmentById } from "@/actions/admin/department.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import UpdateDepartmentForm from "./components/UpdateDepartmentForm";
import { updateDepartment } from "@/actions/admin/department.action";
import { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}
interface EditDepartmentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditDepartmentPageProps): Promise<Metadata> {
  const { id } = await params;
  const department = await getDepartmentById(id);
  return {
    title: department ? `Edit ${department.name}` : "Edit Scheme",
  };
}

export default async function DepartmentPage({ params }: PageProps) {
  const deptId = (await params).id;
  const department = await getDepartmentById(deptId);

  if (!department) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/admin/dashboard/departments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Departments
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          {department.name}
        </h1>
      </div>

      <div className="grid gap-6">
        {/* Department Info */}
        <Card>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateDepartmentForm
              department={department}
              updateDepartment={updateDepartment}
            />
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{department._count.schemes}</p>
              <p className="text-muted-foreground">
                Total schemes in this department
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moderators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {department._count.moderators}
              </p>
              <p className="text-muted-foreground">
                Total moderators in this department
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
