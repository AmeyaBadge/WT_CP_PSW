import { getPublicDepartments } from "@/actions/public/public.action";
import DepartmentCard from "@/components/DepartmentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore all departments of Panchayat Samiti Wai and their services",
};

const DepartmentsPage = async () => {
  const departments = await getPublicDepartments();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-4">
          Departments
        </h1>
        <p className="text-gray-600 text-lg">
          Explore different departments of Panchayat Samiti Wai and their services
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-govt-blue">{departments.length}</div>
            <div className="text-gray-600">Total Departments</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-govt-blue">
              {departments.reduce((sum, dept) => sum + dept.schemesCount, 0)}
            </div>
            <div className="text-gray-600">Active Schemes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-govt-blue">24/7</div>
            <div className="text-gray-600">Service Availability</div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      {departments.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={{
                id: department.id,
                slug: department.slug,
                name: department.name,
                description: department.description,
                image: department.image,
                schemesCount: department.schemesCount,
                contact: department.contact,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-500">Departments will be added soon.</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
