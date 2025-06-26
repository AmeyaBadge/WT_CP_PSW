import React from "react";
import Link from "next/link";
import Image from "next/image";

type SchemeCardProps = {
  title: string;
  description: string;
  department: string;
  schemeId: string;
  image: string;
};

const SchemeCard = async ({
  title,
  description,
  department,
  schemeId,
  image,
}: SchemeCardProps) => {
  return (
    <Link href={`/schemes/${schemeId}`}>
      <div className="bg-white rounded-lg shadow-govt overflow-hidden">
        <div className="relative h-48">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-govt-saffron rounded-md p-2">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-govt-green/10 text-govt-green">
            {department}
          </span>
          <span className="text-sm font-medium text-govt-blue hover:text-blue-700">
            View details<span aria-hidden="true"> &rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SchemeCard;
