import Image from "next/image";
import Link from "next/link";

export type DepartmentCard = {
  slug : string;

  image: string;
  name: string;
  description: string;
  id: string;
  schemesCount: number;
  contact: string;
};

const DepartmentCard = ({ department }: { department: DepartmentCard }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="relative h-48">
        <Image
          src={department.image}
          alt={department.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-govt-blue mb-2">
          {department.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {department.description}
        </p>
        <div className="flex justify-between items-center">
          <Link
            href={`/departments/${department.slug}`}
            className="text-govt-saffron font-semibold hover:underline"
            aria-label={`View ${department.name} department`}
          >
            View Department
          </Link>
          <span className="text-sm text-gray-500">
            {department.schemesCount} schemes
          </span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
