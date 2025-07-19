import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, MapPin } from "lucide-react";

interface PublicSchemeCardProps {
  scheme: {
    id: string;
    title: string;
    description: string;
    coverImage?: string;
    department: string;
    category: string;
    beneficiaries?: string;
    location?: string;
    status: "Active" | "Inactive" | "Upcoming";
    createdAt?: Date;
  };
}

const PublicSchemeCard = ({ scheme }: PublicSchemeCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Upcoming":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Inactive":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-govt-saffron/30 bg-white">
      <Link href={`/schemes/${scheme.id}`}>
        <div className="relative overflow-hidden">
          {scheme.coverImage ? (
            <div className="relative h-48 w-full">
              <Image
                src={scheme.coverImage}
                alt={scheme.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-govt-blue/10 to-govt-saffron/10 flex items-center justify-center">
              <div className="text-6xl text-govt-blue/30">📋</div>
            </div>
          )}
          
          {/* Status Badge */}
          <Badge
            className={`absolute top-3 right-3 ${getStatusColor(scheme.status)}`}
          >
            {scheme.status}
          </Badge>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold text-govt-blue group-hover:text-govt-saffron transition-colors line-clamp-2">
              {scheme.title}
            </CardTitle>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {scheme.department}
            </Badge>
            <Badge variant="outline" className="text-xs text-govt-green">
              {scheme.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {scheme.description}
          </p>

          <div className="space-y-2 text-xs text-gray-500">
            {scheme.beneficiaries && (
              <div className="flex items-center gap-2">
                <Users size={14} className="text-govt-blue" />
                <span>{scheme.beneficiaries}</span>
              </div>
            )}
            
            {scheme.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-govt-blue" />
                <span>{scheme.location}</span>
              </div>
            )}
            
            {scheme.createdAt && (
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-govt-blue" />
                <span>
                  Added on {scheme.createdAt.toLocaleDateString("en-IN")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 text-right">
            <span className="text-govt-blue text-sm font-medium group-hover:text-govt-saffron transition-colors">
              Learn More →
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PublicSchemeCard;
