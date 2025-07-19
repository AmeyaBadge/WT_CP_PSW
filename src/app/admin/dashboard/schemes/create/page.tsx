import { checkApproval, isAdmin } from "@/actions/admin/user.action";
import { getDepartments } from "@/actions/admin/scheme.action";
import { getCurrentUserDepartmentId } from "@/actions/admin/department.action";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import SchemeForm from "../components/SchemeForm";

export const metadata: Metadata = {
  title: "Create Scheme",
};

const CreateSchemePage = async () => {
  // Check approval and authentication
  await checkApproval();

  const isUserAdmin = await isAdmin();
  const departments = await getDepartments();
  
  // Get user's department if they're not admin
  let userDepartmentId = "";
  if (!isUserAdmin) {
    const deptId = await getCurrentUserDepartmentId();
    if (!deptId) {
      redirect("/403");
    }
    userDepartmentId = deptId;
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <Heading
          title="Create New Scheme"
          description="Add a new government scheme with all necessary details and information."
        />
      </div>

      <Separator />

      <SchemeForm
        departments={departments}
        isAdmin={isUserAdmin}
        mode="create"
        initialData={{
          name: "",
          shortDesc: "",
          description: "",
          type: "State",
          departmentId: isUserAdmin ? "" : userDepartmentId,
        }}
      />
    </div>
  );
};

export default CreateSchemePage;
