import { getPublicDepartmentBySlug } from "@/actions/public/public.action";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SchemeCard from "@/components/SchemeCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Users,
  FileText,
  Images,
} from "lucide-react";
import { Metadata } from "next";

interface DepartmentDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DepartmentDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = await getPublicDepartmentBySlug(slug);

  if (!department) {
    return {
      title: "Department Not Found",
    };
  }

  return {
    title: department.name,
    description: department.description,
  };
}

const DepartmentDetailsPage = async ({
  params,
}: DepartmentDetailsPageProps) => {
  const { slug } = await params;
  console.log("Fetching department with slug:", slug);
  const department = await getPublicDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/departments"
          className="inline-flex items-center text-govt-blue hover:text-govt-blue/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Departments
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Department Image */}
          {department.image && (
            <div className="relative h-48 w-full md:w-64 md:h-48 rounded-lg overflow-hidden shadow-md shrink-0">
              <Image
                src={department.image}
                alt={department.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Department Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-4">
              {department.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {department.description}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              {department.contact && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{department.contact}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="h-4 w-4" />
                <span>{department.schemes.length} Active Schemes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Department Schemes */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-govt-blue">
                Available Schemes
              </h2>
              <Link
                href={`/schemes?department=${department.id}`}
                className="text-govt-blue hover:underline text-sm font-medium"
              >
                View all schemes →
              </Link>
            </div>

            {department.schemes.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {department.schemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    schemeId={scheme.slug}
                    title={scheme.name}
                    department={department.name}
                    description={scheme.shortDesc}
                    image={scheme.image || "/assets/schemes/default.jpg"}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <FileText className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No schemes available
                </h3>
                <p className="text-gray-500">
                  This department currently has no active schemes.
                </p>
              </Card>
            )}
          </section>

          {/* Gallery Images */}
          {department.images && department.images.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-govt-blue mb-6 flex items-center gap-2">
                <Images className="h-6 w-6" />
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {department.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative h-48 w-full rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={`${department.name} gallery image`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-govt-blue">
              Department Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Schemes:</span>
                <span className="font-semibold">
                  {department.schemes.length}
                </span>
              </div>
              {department.images && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Gallery Images:</span>
                  <span className="font-semibold">
                    {department.images.length}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-govt-blue">
              Contact Information
            </h3>
            <div className="space-y-3">
              {department.contact && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-govt-blue mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-gray-600">
                      {department.contact}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-govt-blue mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Office</div>
                  <div className="text-sm text-gray-600">
                    Panchayat Samiti Wai
                    <br />
                    Satara District, Maharashtra
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-govt-blue">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-govt-blue hover:bg-govt-blue/90 text-white"
              >
                <Link href={`/schemes?department=${department.id}`}>
                  View All Schemes
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Contact Department</Link>
              </Button>
            </div>
          </Card>

          {/* Help */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-govt-blue">
              Need Assistance?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Our team is here to help you with any queries related to this
              department.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/contact">Get Help</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;
