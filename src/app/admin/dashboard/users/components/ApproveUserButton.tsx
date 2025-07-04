"use client";

import { approveUser } from "@/actions/admin/user.action";
import { Button } from "@/components/ui/button";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={"ghost"}
      className={`border border-green-500/20 bg-green-700/10!  text-green-500  dark:bg-green-700/10! dark:border-green-500/20 ${pending ? "cursor-progress" : "cursor-pointer hover:bg-green-700! hover:text-accent-foreground dark:hover:bg-green-700!"}`}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center animate-spin">
          <LoaderCircle className="size-4" />
        </div>
      ) : (
        <CircleCheck />
      )}
    </Button>
  );
};

const ApproveUserButton = ({ dbId }: { dbId: string }) => {
  const approveUserByDBId = approveUser.bind(null, dbId);

  return (
    <form action={approveUserByDBId}>
      <SubmitButton />
    </form>
  );
};

export default ApproveUserButton;
