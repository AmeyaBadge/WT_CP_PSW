"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  variant = "ghost",
  className,
}: {
  children?: React.ReactNode;
  variant?:
    | "ghost"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      className={`border border-green-500/20 bg-green-700/10!  text-green-500  dark:bg-green-700/10! dark:border-green-500/20 ${pending ? "cursor-progress" : "cursor-pointer hover:bg-green-700! hover:text-accent-foreground dark:hover:bg-green-700!"} ${className}`}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center animate-spin">
          <LoaderCircle className="size-4" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
