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
import { Loader2, Trash2 } from "lucide-react";
import React, { useTransition } from "react";
import { deleteUser } from "@/actions/admin/user.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RemoveUserButton = ({ dbUserId }: { dbUserId: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteUser(dbUserId);
        if (result.success) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to delete user");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="border border-red-500/20 bg-red-700/10! hover:bg-red-700! text-red-500 hover:text-accent-foreground dark:bg-red-700/10! dark:border-red-500/20 dark:hover:bg-red-700!"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
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
