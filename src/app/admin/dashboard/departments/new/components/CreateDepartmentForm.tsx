"use client";

import {
  createDepartment,
  generateDepartmentSlug,
} from "@/actions/admin/department.action";
import { CoverImageUpload } from "@/components/admin/CoverImageUpload";
import SubmitBtn from "@/components/admin/SubmitBtn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateDepartmentForm() {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contact: "",
    slug: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    try {
      const slug = await generateDepartmentSlug(formData.name);
      await createDepartment({
        ...formData,
        slug,
        image: coverImage,
      });

      toast.success("Department created successfully");
      router.push("/admin/dashboard/departments");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create department");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" size="sm">
        <Link href="/admin/dashboard/departments">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Departments
        </Link>
      </Button>

      <form onSubmit={handleSubmit}>
        <Card className="bg-card">
          <CardHeader className="space-y-1 px-6">
            <CardTitle className="text-2xl">Department Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add a new department to your organization
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="coverImage">Cover Image *</Label>
                <div className="mt-2">
                  <CoverImageUpload
                    value={coverImage}
                    onChange={setCoverImage}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2">
                  Recommended size: 1200x630 pixels
                </span>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Information *</Label>
                  <Textarea
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                    placeholder="Address, Phone Numbers, Email&#10;Each on new line"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/dashboard/departments")}
          >
            Cancel
          </Button>
          <SubmitBtn>Create Department</SubmitBtn>
        </div>
      </form>
    </div>
  );
}
