"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

const RemoveUserButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="border border-red-500/20 bg-red-700/10! hover:bg-red-700! text-red-500 hover:text-accent-foreground dark:bg-red-700/10! dark:border-red-500/20 dark:hover:bg-red-700!"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveUserButton;

// import { Button } from "@/components/ui/button";
// import { Loader2, ShieldOff } from "lucide-react";
// import { useTransition } from "react";

// const RevokeUserButton = ({ dbId }: { dbId: string }) => {
//   const [isPending, startTransition] = useTransition();

//   const handleSubmit = () => {
//     startTransition(async () => {
//       await removeRole(dbId);
//       // Optional: reload or revalidate
//       window.location.reload(); // if you want full reload
//       // OR use router.refresh() if using next/navigation
//     });
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button
//           variant={"outline"}
//           disabled={isPending}
//           className="border border-red-500/20 bg-red-700/10! hover:bg-red-700! text-red-500 hover:text-accent-foreground dark:bg-red-700/10! dark:border-red-500/20 dark:hover:bg-red-700!"
//         >
//           {isPending ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <>
//               <ShieldOff className="size-4 mr-2" />
//               Unauthorize
//             </>
//           )}
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This will revoke the user's approval and they will no longer be
//             authorized.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction asChild>
//             <Button
//               onClick={handleSubmit}
//               variant="default"
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 "Continue"
//               )}
//             </Button>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default RevokeUserButton;
