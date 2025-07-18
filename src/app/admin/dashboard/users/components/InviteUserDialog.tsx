"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inviteUser } from "@/actions/admin/user.action";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

const InviteUserDialog = () => {
  const [email, setEmail] = useState("");
  const [inviteDepartment, setInviteDepartment] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    startTransition(async () => {
      const result = await inviteUser({
        email,
        department: inviteDepartment,
      });

      if (result?.success) {
        toast.success("Invitation sent!");
        setEmail("");
        setInviteDepartment("");
        setOpen(false);
      } else {
        toast.error("Failed to send invite");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          <Send />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleInvite}>
          <div className="sm:max-w-xl space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl">Invite User to PSW</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="inviteEmail">User Email</Label>
                <Input
                  id="inviteEmail"
                  name="inviteEmail"
                  type="email"
                  placeholder="Enter email to invite"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="inviteDepartment">Department</Label>
                <Select
                  value={inviteDepartment}
                  onValueChange={(val) => setInviteDepartment(val)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue id="inviteDepartment" placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alert">Alert</SelectItem>
                    <SelectItem value="Update">Update</SelectItem>
                    <SelectItem value="Notice">Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant={"ghost"}
                className={`border border-green-500/20 bg-green-700/10 text-green-500 ${isPending ? "cursor-progress opacity-60" : "hover:bg-green-700 hover:text-white"}`}
                disabled={!email.trim() || isPending}
              >
                {isPending ? (
                  <div className="flex items-center justify-center animate-spin">
                    <LoaderCircle className="size-4" />
                  </div>
                ) : (
                  <>
                    <Send className="mr-2" /> Invite
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog;
