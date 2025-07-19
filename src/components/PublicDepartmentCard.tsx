import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Users } from "lucide-react";

interface PublicDepartmentCardProps {
  department: {
    id: string;
    name: string;
    description: string;
    image?: string;
    head?: string;
    contact?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    schemesCount?: number;
    category: string;
  };
}

const PublicDepartmentCard = ({ department }: PublicDepartmentCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-govt-saffron/30 bg-white">
      <Link href={`/departments/${department.id}`}>
        <div className="relative overflow-hidden">
          {department.image ? (
            <div className="relative h-48 w-full">
              <Image
                src={department.image}
                alt={department.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-govt-blue/10 to-govt-green/10 flex items-center justify-center">
              <div className="text-6xl text-govt-blue/30">🏛️</div>
            </div>
          )}
          
          {/* Category Badge */}
          <Badge className="absolute top-3 right-3 bg-govt-blue text-white">
            {department.category}
          </Badge>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-govt-blue group-hover:text-govt-saffron transition-colors line-clamp-2">
            {department.name}
          </CardTitle>
          
          {department.head && (
            <p className="text-sm text-gray-600 mt-1">
              Head: <span className="font-medium">{department.head}</span>
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {department.description}
          </p>

          {/* Contact Information */}
          {department.contact && (
            <div className="space-y-2 mb-4">
              {department.contact.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone size={14} className="text-govt-blue" />
                  <span>{department.contact.phone}</span>
                </div>
              )}
              
              {department.contact.email && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail size={14} className="text-govt-blue" />
                  <span className="truncate">{department.contact.email}</span>
                </div>
              )}
              
              {department.contact.address && (
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <MapPin size={14} className="text-govt-blue mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{department.contact.address}</span>
                </div>
              )}
            </div>
          )}

          {/* Schemes Count */}
          {department.schemesCount !== undefined && (
            <div className="flex items-center gap-2 mb-4">
              <Users size={14} className="text-govt-green" />
              <span className="text-sm text-gray-600">
                {department.schemesCount} Active Schemes
              </span>
            </div>
          )}

          <div className="text-right">
            <span className="text-govt-blue text-sm font-medium group-hover:text-govt-saffron transition-colors">
              View Details →
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PublicDepartmentCard;
