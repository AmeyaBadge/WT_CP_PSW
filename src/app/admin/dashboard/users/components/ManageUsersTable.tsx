import { getAllUsers } from "@/actions/admin/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RevokeUserButton from "./RevokeUserButton";

type UsersType = Awaited<ReturnType<typeof getAllUsers>>;

const ManageUsersTable = ({ users }: { users: UsersType }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id} className="h-12 text-left">
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image} alt="Avatar" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department?.name ?? "ReInvite User"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <RevokeUserButton dbId={user.id} />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              Approve users before assigning them.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ManageUsersTable;
