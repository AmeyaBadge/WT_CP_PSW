import { Loader2 } from "lucide-react";
import React from "react";

const AdminLoadingPage = () => {
  return (
    <div className="w-full min-h-screen h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-white" />
    </div>
  );
};

export default AdminLoadingPage;
