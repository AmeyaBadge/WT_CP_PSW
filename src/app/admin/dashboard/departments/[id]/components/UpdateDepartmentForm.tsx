"use client";

import { CoverImageUpload } from "@/components/admin/CoverImageUpload";
import SubmitBtn from "@/components/admin/SubmitBtn";
import { generateDepartmentSlug } from "@/actions/admin/department.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Department } from "@/generated/prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import HierarchyEditor, {
  HierarchyNode,
} from "@/components/admin/HierarchyEditor";

interface UpdateDepartmentFormProps {
  department: any;
  updateDepartment: (
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      contact?: string;
      image?: string;
      hierarchy?: HierarchyNode[];
    },
  ) => Promise<Department>;
}

export default function UpdateDepartmentForm({
  department,
  updateDepartment,
}: UpdateDepartmentFormProps) {
  const [coverImage, setCoverImage] = useState(department.image);
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>(
    (department.hierarchy as HierarchyNode[]) || [],
  );

  async function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string;
    const slug =
      department.name !== name
        ? await generateDepartmentSlug(name, department.id)
        : department.slug;
    const data = {
      name,
      description: formData.get("description") as string,
      contact: formData.get("contact") as string,
      image: coverImage,
      slug,
      hierarchy,
    };

    try {
      await updateDepartment(department.id, data);
      toast.success("Department updated successfully");
    } catch (error) {
      toast.error("Failed to update department");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="coverImage">Cover Image</Label>
          <div className="mt-2">
            <CoverImageUpload value={coverImage} onChange={setCoverImage} />
          </div>
        </div>

        <div>
          <Label htmlFor="name">Department Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={department.name}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={department.description}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="contact">Contact Information</Label>
          <Textarea
            id="contact"
            name="contact"
            defaultValue={department.contact}
            className="mt-2"
            required
            placeholder="Address, Phone Numbers, Email&#10;Each on new line"
            rows={4}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Hierarchy Editor */}
      <HierarchyEditor value={hierarchy} onChange={setHierarchy} />

      <Separator className="my-6" />

      <div className="flex justify-end">
        <SubmitBtn>Save Changes</SubmitBtn>
      </div>
    </form>
  );
}
