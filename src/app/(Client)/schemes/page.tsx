import { getPublicSchemes, getPublicDepartments } from "@/actions/public/public.action";
import SchemeCard from "@/components/SchemeCard";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Schemes",
  description: "Browse all government schemes available in Panchayat Samiti Wai",
};

interface SchemesPageProps {
  searchParams: Promise<{
    search?: string;
    department?: string;
    type?: string;
  }>;
}

const SchemesPage = async ({ searchParams }: SchemesPageProps) => {
  const params = await searchParams;
  const { search, department, type } = params;

  // Fetch schemes and departments
  const [schemes, departments] = await Promise.all([
    getPublicSchemes({
      search,
      departmentId: department,
      type,
    }),
    getPublicDepartments(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-4">
          Government Schemes
        </h1>
        <p className="text-gray-600 text-lg">
          Explore various government schemes available for the people of Wai region
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form method="GET" className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Schemes
            </label>
            <input
              type="text"
              id="search"
              name="search"
              defaultValue={search}
              placeholder="Search by name or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-govt-blue"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              id="department"
              name="department"
              defaultValue={department}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-govt-blue"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Scheme Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue={type}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-govt-blue"
            >
              <option value="">All Types</option>
              <option value="Central">Central</option>
              <option value="State">State</option>
              <option value="Local">Local</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-govt-blue text-white px-4 py-2 rounded-md hover:bg-govt-blue/90 transition-colors"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          {schemes.length} scheme{schemes.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Schemes Grid */}
      <Suspense fallback={<div className="text-center py-8">Loading schemes...</div>}>
        {schemes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                schemeId={scheme.slug}
                title={scheme.name}
                department={scheme.department.name}
                description={scheme.shortDesc}
                image={scheme.image || "/assets/schemes/default.jpg"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SchemesPage;
