"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus, SquarePen } from "lucide-react";
import FormSubmitButton from "./FormSubmitButton";
import {
  createAnnouncement,
  updateAnnouncement,
} from "@/actions/announcement.action";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CreateAnnouncementDialog = ({
  update = false,
  updateId = "",
  updateType = "Alert",
  updateTitle = "",
  updateContent = "",
}: {
  update?: boolean;
  updateId?: string;
  updateType?: "Alert" | "Update" | "Notice";
  updateTitle?: string;
  updateContent?: string;
}) => {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(updateTitle);
  const [text, setText] = useState(updateContent);

  const updateAnnouncementById = updateAnnouncement.bind(null, updateId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {update ? (
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-amber-400 hover:text-amber-500 hover:bg-amber-500/10!"
          >
            <SquarePen />
          </Button>
        ) : (
          <Button variant={"outline"} className="cursor-pointer">
            <Plus />
            Add New
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form action={!update ? createAnnouncement : updateAnnouncementById}>
          <div className="sm:max-w-xl space-y-4">
            <DialogHeader>
              <DialogTitle>
                {update ? "Update" : "Create"} Announcement
              </DialogTitle>
              {/* <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                  </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="announcementType">Type</Label>
                <Select
                  name="type"
                  defaultValue="Alert"
                  onValueChange={(val) => console.log(val)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue id="announcementType" placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alert">Alert</SelectItem>
                    <SelectItem value="Update">Update</SelectItem>
                    <SelectItem value="Notice">Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="announ">Title</Label>
                <Input
                  id="announcementTitle"
                  name="title"
                  placeholder="Enter the announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Content</Label>
                <Textarea
                  id="announcementContent"
                  className="min-h-[100px]"
                  placeholder="What's on your mind?"
                  name="content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  disabled={!title.trim() || !text.trim() || pending}
                  type="submit"
                  className="disabled:bg-muted-foreground cursor-pointer"
                >
                  {pending ? (
                    <div className="flex items-center justify-center animate-spin">
                      <LoaderCircle className="size-4" />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementDialog;
