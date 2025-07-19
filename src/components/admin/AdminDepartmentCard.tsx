import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, FileTextIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getAllDepartments } from "@/actions/admin/department.action";
import Image from "next/image";

type Department = Awaited<ReturnType<typeof getAllDepartments>>[0];

const AdminDepartmentCard = ({ department }: { department: Department }) => {
  return (
    <Card className="border-gray-700 hover:shadow-lg transition-shadow group">
      <div className="relative h-48 w-full">
        <Image
          src={department.image}
          alt={department.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-gray-100">{department.name}</CardTitle>
        <CardDescription className="text-gray-400">
          {department.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">
            {department._count.moderators} users
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">
            {department._count.schemes} schemes
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          className="w-full border-gray-600 text-gray-100 hover:bg-gray-600"
        >
          <>
            {" "}
            Manage <ArrowRightIcon className="ml-2 h-4 w-4" />
          </>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminDepartmentCard;
