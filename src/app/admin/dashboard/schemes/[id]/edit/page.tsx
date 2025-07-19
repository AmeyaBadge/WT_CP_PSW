import { checkApproval, isAdmin } from "@/actions/admin/user.action";
import { getSchemeById, getDepartments } from "@/actions/admin/scheme.action";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemeForm from "../../components/SchemeForm";

interface EditSchemePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditSchemePageProps): Promise<Metadata> {
  const { id } = await params;
  const scheme = await getSchemeById(id);
  return {
    title: scheme ? `Edit ${scheme.name}` : "Edit Scheme",
  };
}

const EditSchemePage = async ({ params }: EditSchemePageProps) => {
  await checkApproval();

  const { id } = await params;
  const scheme = await getSchemeById(id);
  
  if (!scheme) {
    notFound();
  }

  const isUserAdmin = await isAdmin();
  const departments = await getDepartments();

  const initialData = {
    id: scheme.id,
    name: scheme.name,
    shortDesc: scheme.shortDesc,
    description: scheme.description,
    image: scheme.image,
    type: scheme.type as "Central" | "State" | "Local",
    eligibility: scheme.eligibility,
    deadline: scheme.deadline,
    benifits: scheme.benifits,
    howToApply: scheme.howToApply,
    documentsReq: scheme.documentsReq,
    applyLink: scheme.applyLink,
    applicationFormLink: scheme.applicationFormLink,
    departmentId: scheme.departmentId,
    images: scheme.images || [], // Include gallery images
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <Heading
          title={`Edit ${scheme.name}`}
          description="Update scheme information and details."
        />
      </div>

      <Separator />

      <SchemeForm
        initialData={initialData}
        departments={departments}
        isAdmin={isUserAdmin}
        mode="edit"
      />
    </div>
  );
};

export default EditSchemePage;
