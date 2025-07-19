"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { createScheme, updateScheme } from "@/actions/admin/scheme.action";
import { SchemeImageUpload } from "@/components/admin/SchemeImageUpload";
import { CoverImageUpload } from "@/components/admin/CoverImageUpload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SchemeFormProps {
  initialData?: {
    id?: string;
    name: string;
    shortDesc: string;
    description: string;
    image?: string | null;
    type: "Central" | "State" | "Local";
    eligibility?: string | null;
    deadline?: Date | null;
    benifits?: string | null;
    howToApply?: string | null;
    documentsReq?: string | null;
    applyLink?: string | null;
    applicationFormLink?: string | null;
    departmentId: string;
    images?: { id: string; url: string; type: string }[];
  };
  departments: { id: string; name: string }[];
  isAdmin: boolean;
  mode: "create" | "edit";
}

const SchemeForm = ({ initialData, departments, isAdmin, mode }: SchemeFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    shortDesc: initialData?.shortDesc || "",
    description: initialData?.description || "",
    type: initialData?.type || "State",
    eligibility: initialData?.eligibility || "",
    deadline: initialData?.deadline 
      ? new Date(initialData.deadline).toISOString().split('T')[0] 
      : "",
    benifits: initialData?.benifits || "",
    howToApply: initialData?.howToApply || "",
    documentsReq: initialData?.documentsReq || "",
    applyLink: initialData?.applyLink || "",
    applicationFormLink: initialData?.applicationFormLink || "",
    departmentId: initialData?.departmentId || "",
  });

  // Separate state for gallery images
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.images?.map(img => img.url) || []
  );

  // Separate state for cover image
  const [coverImage, setCoverImage] = useState<string>(
    initialData?.image || ""
  );

  // Update name only
  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value.toString());
    });

    // Add cover image
    formDataObj.append('image', coverImage);

    // Add gallery images
    console.log("Gallery images being sent:", galleryImages);
    formDataObj.append('galleryImages', JSON.stringify(galleryImages));

    startTransition(async () => {
      try {
        let result;
        if (mode === "create") {
          result = await createScheme(formDataObj);
        } else {
          result = await updateScheme(initialData!.id!, formDataObj);
        }

        if (result.success) {
          toast.success(result.message);
          router.push("/admin/dashboard/schemes");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <Card className="p-8">
          <h3 className="text-lg font-semibold mb-6">Basic Information</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Scheme Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter scheme name"
                required
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                URL slug will be automatically generated from the name
              </p>
            </div>

            <div>
              <Label htmlFor="shortDesc">Short Description *</Label>
              <Textarea
                id="shortDesc"
                value={formData.shortDesc}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                placeholder="Brief description of the scheme"
                rows={3}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="type">Scheme Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select scheme type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Central">Central</SelectItem>
                  <SelectItem value="State">State</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isAdmin && (
              <div>
                <Label htmlFor="departmentId">Department *</Label>
                <Select
                  value={formData.departmentId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, departmentId: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </Card>

        {/* Additional Details */}
        <Card className="p-8">
          <h3 className="text-lg font-semibold mb-6">Additional Details</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="coverImage">Cover Image</Label>
              <div className="mt-2">
                <CoverImageUpload
                  value={coverImage}
                  onChange={setCoverImage}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="galleryImages">Additional Images (Gallery)</Label>
              <div className="mt-2">
                <SchemeImageUpload
                  value={galleryImages}
                  onChange={setGalleryImages}
                  disabled={isPending}
                  maxImages={5}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="eligibility">Eligibility Criteria</Label>
              <Textarea
                id="eligibility"
                value={formData.eligibility}
                onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
                placeholder="Who can apply for this scheme?"
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="applyLink">Application Link</Label>
              <Input
                id="applyLink"
                value={formData.applyLink}
                onChange={(e) => setFormData(prev => ({ ...prev, applyLink: e.target.value }))}
                placeholder="https://example.com/apply"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="applicationFormLink">Application Form Link</Label>
              <Input
                id="applicationFormLink"
                value={formData.applicationFormLink}
                onChange={(e) => setFormData(prev => ({ ...prev, applicationFormLink: e.target.value }))}
                placeholder="https://example.com/form.pdf"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                TODO: File Upload functionality
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Full Width Fields */}
      <Card className="p-8">
        <h3 className="text-lg font-semibold mb-6">Detailed Information</h3>
        <div className="space-y-6">
          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Comprehensive description of the scheme"
              rows={5}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="benifits">Benefits</Label>
            <Textarea
              id="benifits"
              value={formData.benifits}
              onChange={(e) => setFormData(prev => ({ ...prev, benifits: e.target.value }))}
              placeholder="What benefits does this scheme provide?"
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="howToApply">How to Apply</Label>
            <Textarea
              id="howToApply"
              value={formData.howToApply}
              onChange={(e) => setFormData(prev => ({ ...prev, howToApply: e.target.value }))}
              placeholder="Step-by-step application process"
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="documentsReq">Required Documents</Label>
            <Textarea
              id="documentsReq"
              value={formData.documentsReq}
              onChange={(e) => setFormData(prev => ({ ...prev, documentsReq: e.target.value }))}
              placeholder="List of required documents"
              rows={4}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "create" ? "Creating..." : "Updating..."}
            </>
          ) : (
            mode === "create" ? "Create Scheme" : "Update Scheme"
          )}
        </Button>
      </div>

      {/* Required fields notice */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4" />
        <span>Fields marked with * are required</span>
      </div>
    </form>
  );
};

export default SchemeForm;
