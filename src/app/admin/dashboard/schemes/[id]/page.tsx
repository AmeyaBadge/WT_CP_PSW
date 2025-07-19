import { checkApproval } from "@/actions/admin/user.action";
import { getSchemeById } from "@/actions/admin/scheme.action";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Edit, Calendar, ExternalLink, FileText, Users, Building2 } from "lucide-react";
import { Metadata } from "next";

interface SchemeDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SchemeDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const scheme = await getSchemeById(id);
  return {
    title: scheme ? `${scheme.name} - Scheme Details` : "Scheme Not Found",
  };
}

const SchemeDetailsPage = async ({ params }: SchemeDetailsPageProps) => {
  await checkApproval();

  const { id } = await params;
  const scheme = await getSchemeById(id);
  
  if (!scheme) {
    notFound();
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Central":
        return "bg-blue-500/10 text-blue-700";
      case "State":
        return "bg-green-500/10 text-green-700";
      case "Local":
        return "bg-orange-500/10 text-orange-700";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "No deadline specified";
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const isExpired = scheme.deadline ? new Date(scheme.deadline) < new Date() : false;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Heading
            title={scheme.name}
            description={scheme.shortDesc}
          />
          <div className="flex gap-2 items-center">
            <Badge className={getTypeColor(scheme.type)}>
              {scheme.type}
            </Badge>
            <Badge variant={isExpired ? "destructive" : "default"}>
              {isExpired ? "Expired" : "Active"}
            </Badge>
          </div>
        </div>
        <Link href={`/admin/dashboard/schemes/${scheme.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Scheme
          </Button>
        </Link>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scheme Image */}
          {scheme.image && (
            <Card className="p-6">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={scheme.image}
                  alt={scheme.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          )}

          {/* Description */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{scheme.description}</p>
            </div>
          </Card>

          {/* Benefits */}
          {scheme.benifits && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Benefits
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{scheme.benifits}</p>
              </div>
            </Card>
          )}

          {/* How to Apply */}
          {scheme.howToApply && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                How to Apply
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{scheme.howToApply}</p>
              </div>
            </Card>
          )}

          {/* Required Documents */}
          {scheme.documentsReq && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{scheme.documentsReq}</p>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-muted-foreground">{scheme.department.name}</p>
                </div>
              </div>
              
              {scheme.deadline && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Deadline</p>
                    <p className={`text-sm ${isExpired ? 'text-red-600' : 'text-muted-foreground'}`}>
                      {formatDate(scheme.deadline)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 text-muted-foreground">🏷️</span>
                <div>
                  <p className="text-sm font-medium">Scheme Type</p>
                  <p className="text-sm text-muted-foreground">{scheme.type}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Eligibility */}
          {scheme.eligibility && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Eligibility</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {scheme.eligibility}
              </p>
            </Card>
          )}

          {/* Application Links */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Application Links</h3>
            <div className="space-y-3">
              {scheme.applyLink && (
                <a
                  href={scheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Apply Online
                </a>
              )}
              
              {scheme.applicationFormLink && (
                <a
                  href={scheme.applicationFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Download Application Form
                </a>
              )}

              {!scheme.applyLink && !scheme.applicationFormLink && (
                <p className="text-sm text-muted-foreground">
                  No application links available
                </p>
              )}
            </div>
          </Card>

          {/* Scheme Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Scheme Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slug:</span>
                <span className="font-mono">{scheme.slug}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailsPage;
