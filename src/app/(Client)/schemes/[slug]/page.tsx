import { getPublicSchemeBySlug } from "@/actions/public/public.action";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ExternalLink, 
  FileText, 
  Users, 
  Building2,
  ArrowLeft,
  Clock,
  CheckCircle
} from "lucide-react";
import { Metadata } from "next";

interface SchemeDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SchemeDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scheme = await getPublicSchemeBySlug(slug);

  if (!scheme) {
    return {
      title: "Scheme Not Found",
    };
  }

  return {
    title: scheme.name,
    description: scheme.shortDesc,
  };
}

const SchemeDetailsPage = async ({ params }: SchemeDetailsPageProps) => {
  const { slug } = await params;
  const scheme = await getPublicSchemeBySlug(slug);

  if (!scheme) {
    notFound();
  }

  const typeColors = {
    Central: "bg-red-100 text-red-800",
    State: "bg-blue-100 text-blue-800", 
    Local: "bg-green-100 text-green-800",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/schemes"
          className="inline-flex items-center text-govt-blue hover:text-govt-blue/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Schemes
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-2 break-words">
              {scheme.name}
            </h1>
            <p className="text-gray-600 text-lg">{scheme.shortDesc}</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Badge className={`${typeColors[scheme.type]} border-0 px-3 py-1`}>
              {scheme.type} Scheme
            </Badge>
            {scheme.deadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-1 h-4 w-4" />
                Deadline: {new Date(scheme.deadline).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Department Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4" />
          <span>Department: </span>
          <Link 
            href={`/departments/${scheme.department.slug}`}
            className="text-govt-blue hover:underline font-medium"
          >
            {scheme.department.name}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scheme Image */}
          {scheme.image && (
            <Card className="p-0 overflow-hidden">
              <div className="relative h-64 w-full">
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
            <h3 className="text-xl font-semibold mb-4 text-govt-blue">About This Scheme</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {scheme.description}
              </p>
            </div>
          </Card>

          {/* Benefits */}
          {scheme.benifits && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-govt-blue flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Benefits
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.benifits}
                </p>
              </div>
            </Card>
          )}

          {/* Eligibility */}
          {scheme.eligibility && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-govt-blue flex items-center gap-2">
                <Users className="h-5 w-5" />
                Eligibility Criteria
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.eligibility}
                </p>
              </div>
            </Card>
          )}

          {/* How to Apply */}
          {scheme.howToApply && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-govt-blue flex items-center gap-2">
                <FileText className="h-5 w-5" />
                How to Apply
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.howToApply}
                </p>
              </div>
            </Card>
          )}

          {/* Required Documents */}
          {scheme.documentsReq && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-govt-blue flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.documentsReq}
                </p>
              </div>
            </Card>
          )}

          {/* Gallery Images */}
          {scheme.images && scheme.images.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-govt-blue">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheme.images.map((image) => (
                  <div key={image.id} className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`${scheme.name} gallery image`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-govt-blue">Quick Actions</h3>
            <div className="space-y-3">
              {scheme.applyLink && (
                <Button asChild className="w-full bg-govt-blue hover:bg-govt-blue/90">
                  <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Apply Online
                  </a>
                </Button>
              )}
              
              {scheme.applicationFormLink && (
                <Button asChild variant="outline" className="w-full">
                  <a href={scheme.applicationFormLink} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Form
                  </a>
                </Button>
              )}

              <Button asChild variant="outline" className="w-full">
                <Link href={`/departments/${scheme.department.slug}`}>
                  <Building2 className="mr-2 h-4 w-4" />
                  Visit Department
                </Link>
              </Button>
            </div>
          </Card>

          {/* Scheme Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-govt-blue">Scheme Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <Badge className={`${typeColors[scheme.type]} border-0`}>
                  {scheme.type}
                </Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="font-medium">{scheme.department.name}</span>
              </div>

              {scheme.deadline && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium">
                    {new Date(scheme.deadline).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Help */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-govt-blue">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact the respective department for assistance with this scheme.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailsPage;
