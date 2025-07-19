import { getSchemes } from "@/actions/admin/scheme.action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, Edit, Trash2 } from "lucide-react";
import DeleteSchemeButton from "./DeleteSchemeButton";

type SchemesType = {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  type: "Central" | "State" | "Local";
  departmentName: string;
  departmentId: string;
  deadline: Date | null;
  isExpired: boolean;
  image: string | null;
  images?: { id: string; url: string; type: string }[];
}[];

const ManageSchemesTable = ({ schemes }: { schemes: SchemesType }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Central":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      case "State":
        return "bg-green-500/10 text-green-700 hover:bg-green-500/20";
      case "Local":
        return "bg-orange-500/10 text-orange-700 hover:bg-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 hover:bg-gray-500/20";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "No deadline";
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Image</TableHead>
            <TableHead>Scheme Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schemes.length > 0 ? (
            schemes.map((scheme) => (
              <TableRow key={scheme.id} className="h-16">
                <TableCell>
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    {/* Show cover image first, then fallback to first gallery image */}
                    {scheme.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={scheme.image}
                          alt={scheme.name}
                          fill
                          className="object-cover"
                        />
                        {scheme.images && scheme.images.length > 0 && (
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            +{scheme.images.length}
                          </div>
                        )}
                      </div>
                    ) : scheme.images && scheme.images.length > 0 ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={scheme.images[0].url}
                          alt={scheme.name}
                          fill
                          className="object-cover opacity-75"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">Gallery</span>
                        </div>
                        {scheme.images.length > 1 && (
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {scheme.images.length}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{scheme.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 max-w-xs">
                      {scheme.shortDesc}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{scheme.departmentName}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${getTypeColor(scheme.type)} text-xs`}
                  >
                    {scheme.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span
                      className={scheme.isExpired ? "text-red-600" : "text-gray-600"}
                    >
                      {formatDate(scheme.deadline)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={scheme.isExpired ? "destructive" : "default"}
                    className="text-xs"
                  >
                    {scheme.isExpired ? "Expired" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Link href={`/admin/dashboard/schemes/${scheme.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-3 w-3" />
                        <span className="sr-only">View scheme</span>
                      </Button>
                    </Link>
                    <Link href={`/admin/dashboard/schemes/${scheme.id}/edit`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Edit scheme</span>
                      </Button>
                    </Link>
                    <DeleteSchemeButton schemeId={scheme.id} schemeName={scheme.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-muted-foreground">No schemes found</p>
                  <Link href="/admin/dashboard/schemes/create">
                    <Button size="sm">Create your first scheme</Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageSchemesTable;
