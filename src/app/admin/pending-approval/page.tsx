import React from "react";
import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkApproval } from "@/actions/admin/user.action";

const Unauthorized = async () => {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/admin/login");

  const approved = sessionClaims.metadata.approved;
  if (approved) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-govt-extra-light">
      {/* <Header /> */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <Image
              src={"/assets/National-Emblem.png"}
              alt="Panchayat Samiti Wai"
              height={80}
              width={80}
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-gov">
            <h1 className="text-6xl font-bold text-govt-blue mb-4">202</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Pending Approval
            </h2>
            <p className="text-gray-600 mb-6">
              You are unauthorized to process this request.
            </p>
            <div className="space-y-4">
              <Link
                replace
                href="/"
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-govt-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Homepage
              </Link>
              <Link
                replace
                href="/contact"
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-govt-blue bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Support
              </Link>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              If you believe this is an error, please{" "}
              <Link
                replace
                href="/contact"
                className="font-medium text-govt-blue hover:text-blue-700"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Unauthorized;
