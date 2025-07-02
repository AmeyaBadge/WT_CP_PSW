"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const FormSubmitButton = (isDisabled: boolean) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={isDisabled ?? pending} type="submit">
      {pending ? (
        <div className="flex items-center justify-center animate-spin">
          <LoaderCircle className="size-4" />
        </div>
      ) : (
        "Submit"
      )}
    </Button>
  );
};

export default FormSubmitButton;
