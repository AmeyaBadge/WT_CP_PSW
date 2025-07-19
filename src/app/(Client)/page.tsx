import {
  getPublicAnnouncements,
  getFeaturedSchemes,
  getPublicDepartments,
} from "@/actions/public/public.action";
import Announcements from "@/components/Announcements";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import MemberCard from "@/components/MemberCard";
import SchemeCard from "@/components/SchemeCard";
import { members } from "@/constants/Home_Persons";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

type AnnouncementType = Awaited<ReturnType<typeof getPublicAnnouncements>>[0];

const Ticker = async () => {
  const data: AnnouncementType[] = await getPublicAnnouncements(5);
  return <AnnouncementTicker announcements={data} />;
};

const AnnouncementsRender = async () => {
  const data: AnnouncementType[] = await getPublicAnnouncements(3);
  return <Announcements announcements={data} />;
};

const page = async () => {
  // Fetch dynamic data
  const featuredSchemes = await getFeaturedSchemes(3);
  const featuredDepartments = await getPublicDepartments();
  const recentAnnouncements = await getPublicAnnouncements(5);

  return (
    <>
      <div className="">
        <Suspense
          fallback={
            <div className="bg-govt-saffron text-black py-2 mb-6 overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="flex items-center">
                  <div className="flex-1 text-center">Loading...</div>
                </div>
              </div>
            </div>
          }
        >
          <Ticker />
        </Suspense>
      </div>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12 relative">
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
            <Image
              src="/assets/wai-landscape.jpg"
              alt="Panoramic view of Wai"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Welcome to Panchayat Samiti Wai
                </h2>
                <p className="text-xl md:text-2xl">
                  Serving the people of Wai with dedication
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <Suspense
            fallback={
              <div className="card w-full bg-white">
                <div className="animate-spin loader"></div>
              </div>
            }
          >
            <AnnouncementsRender />
          </Suspense>
        </section>

        {/* About Wai */}
        <section className="mb-12 card">
          <h2 className="text-2xl md:text-3xl font-bold text-govt-blue mb-6">
            About Wai
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Wai is a historic town in Satara district of Maharashtra, India.
                Located on the Krishna River, it&apos;s known for its ancient
                temples and scenic beauty. Wai has a rich cultural heritage and
                is often referred to as &quot;Dakshin Kashi&quot; due to its
                numerous temples.
              </p>
              <p className="mb-4">
                The Panchayat Samiti Wai is responsible for rural development in
                the Wai region, implementing various government schemes and
                initiatives to improve the quality of life for its residents.
              </p>
              <Link
                href="#"
                className="text-govt-blue font-semibold hover:underline"
              >
                Learn more about Wai →
              </Link>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/assets/wai-map.jpg"
                alt="Map of Wai region"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Featured Schemes */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-govt-blue">
              Government Schemes
            </h2>
            <Link
              href="/schemes"
              className="text-govt-blue font-semibold hover:underline"
            >
              View all schemes →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme) => (
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
        </section>

        {/* Panchayat Members */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-govt-blue mb-6">
            Our Panchayat Samiti Members
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Departments */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-govt-blue">
              Departments
            </h2>
            <Link
              href="/departments"
              className="text-govt-blue font-semibold hover:underline"
            >
              View all departments →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDepartments.slice(0, 3).map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold text-govt-blue mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {dept.description}
                  </p>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-govt-saffron font-semibold hover:underline"
                    aria-label={`Learn more about ${dept.name} department`}
                  >
                    View Department
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
