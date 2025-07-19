"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CoverImageUpload } from "@/components/admin/CoverImageUpload";
import { createDepartment } from "@/actions/admin/department.action";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/admin/SubmitBtn";

export default function CreateDepartmentDialog() {
  const [open, setOpen] = useState(false);
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
      await createDepartment({
        ...formData,
        image: coverImage,
      });

      toast.success("Department created successfully");
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        contact: "",
        slug: "",
      });
      setCoverImage("");
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
      ...(name === "name"
        ? { slug: value.toLowerCase().replace(/\s+/g, "-") }
        : {}),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Department</DialogTitle>
          <DialogDescription>
            Add a new department to your organization
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="coverImage">Cover Image *</Label>
              <div className="mt-2 h-32">
                <CoverImageUpload value={coverImage} onChange={setCoverImage} />
              </div>
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
                <Label htmlFor="slug" className="text-xs text-muted-foreground">
                  URL Slug *
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                  placeholder="auto-generated-from-name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-2 h-20"
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact">Contact Information *</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="mt-2"
                  required
                  placeholder="Phone, email, or address"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <SubmitBtn>Create Department</SubmitBtn>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
