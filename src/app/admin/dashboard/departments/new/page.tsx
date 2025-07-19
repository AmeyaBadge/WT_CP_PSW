import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import CreateDepartmentForm from "./components/CreateDepartmentForm";

export default async function CreateDepartmentPage() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/403");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Department</h1>
          <p className="text-muted-foreground mt-2">
            Add a new department to your organization
          </p>
        </div>

        <CreateDepartmentForm />
      </div>
    </div>
  );
}
