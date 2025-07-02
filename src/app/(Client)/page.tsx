import { getAllNotifications } from "@/actions/announcement.action";
import Announcements from "@/components/Announcements";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import MemberCard from "@/components/MemberCard";
import SchemeCard from "@/components/SchemeCard";
import { members } from "@/constants/Home_Persons";
import { connectToDatabase } from "@/lib/mongodb";
import { Announcement } from "@/models/Announcement_Model";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const announcements: Announcement[] = [
  {
    type: "Alert",
    date: "Today",
    content:
      "Latest: Applications open for PM Awas Yojana till 30th November 2023.",
  },
  {
    type: "Alert",
    date: "Today",
    content:
      "Notice: Gram Sabha meeting on 15th November at 10 AM in Panchayat Office.",
  },
  {
    type: "Alert",
    date: "Today",
    content:
      "Alert: Water supply will be interrupted on 12th November for maintenance work.",
  },
  {
    type: "Alert",
    date: "Today",
    content:
      "Update: New health camp organized on 20th November at Primary Health Center.",
  },
];

const schemes = [
  {
    id: "pm-awas-yojana",
    title: "Pradhan Mantri Awas Yojana",
    titleMarathi: "प्रधानमंत्री आवास योजना",
    type: "central",
    department: "Rural Development",
    departmentMarathi: "ग्रामीण विकास",
    description:
      "Housing for all by 2024 with pucca house to all eligible beneficiaries.",
    descriptionMarathi:
      "पात्र लाभार्थ्यांना २०२४ पर्यंत पक्के घर देण्याची योजना.",
    detailedDescription:
      "The Pradhan Mantri Awas Yojana (PMAY) provides financial assistance for construction of houses to eligible beneficiaries from economically weaker sections in rural areas. The scheme provides Rs. 1.20 lakh in plain areas and Rs. 1.30 lakh in hilly/difficult areas per unit.",
    detailedDescriptionMarathi:
      "प्रधानमंत्री आवास योजनेत ग्रामीण भागातील आर्थिकदृष्ट्या दुर्बल घटकातील लोकांना घर बांधण्यासाठी आर्थिक मदत दिली जाते. या योजनेत साध्या भागात १.२० लाख रुपये आणि डोंगराळ/अवघड भागात १.३० लाख रुपये प्रति युनिट दिले जातात.",
    image: "/assets/schemes/pmay.jpg",
    eligibility: "Families with annual income up to ₹3 lakhs",
    eligibilityMarathi: "वार्षिक उत्पन्न ३ लाख रुपयांपर्यंत असलेले कुटुंब",
    benefits: [
      "Financial assistance of up to ₹1.5 lakhs for construction",
      "Subsidy on home loan interest rates",
      "Preference to women, SC/ST, and minority communities",
    ],
    benefitsMarathi: [
      "बांधकामासाठी १.५ लाख रुपये पर्यंत आर्थिक मदत",
      "गृहकर्जावरील व्याजदरावर सबसिडी",
      "महिला, अनुसूचित जाती/जमाती आणि अल्पसंख्याक समुदायांना प्राधान्य",
    ],
    applicationSteps: [
      "Visit the official PMAY website or Gram Panchayat office",
      "Fill the application form with required details",
      "Attach necessary documents",
      "Submit to concerned authority",
    ],
    applicationStepsMarathi: [
      "अधिकृत पीएमएवाय वेबसाइट किंवा ग्रामपंचायत कार्यालय भेट द्या",
      "आवश्यक तपशीलांसह अर्ज भरा",
      "आवश्यक कागदपत्रे संलग्न करा",
      "संबंधित प्राधिकरणाकडे सादर करा",
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Income Certificate",
      "Caste Certificate (if applicable)",
      "Bank Account Details",
      "Land ownership documents",
    ],
    documentsRequiredMarathi: [
      "आधार कार्ड",
      "उत्पन्न दाखला",
      "जात प्रमाणपत्र (असल्यास)",
      "बँक खाते तपशील",
      "जमीन मालकीची कागदपत्रे",
    ],
    deadline: "31-12-2024",
    applyLink: "https://pmaymis.gov.in",
    faqs: [
      {
        question: "Who is eligible for PMAY?",
        questionMarathi: "पीएमएवाय साठी कोण पात्र आहे?",
        answer:
          "Families with annual income up to ₹3 lakhs are eligible under this scheme.",
        answerMarathi:
          "वार्षिक उत्पन्न ३ लाख रुपयांपर्यंत असलेली कुटुंबे या योजनेअंतर्गत पात्र आहेत.",
      },
    ],
  },
  // Add more schemes...
];

const departments = [
  {
    id: "rural-development",
    name: "Rural Development",
    description:
      "Responsible for implementing rural development schemes and infrastructure projects.",
    detailedDescription:
      "The Rural Development Department of Panchayat Samiti Wai oversees the implementation of various central and state government schemes aimed at improving rural infrastructure, livelihood opportunities, and quality of life in villages under its jurisdiction. The department works closely with Gram Panchayats to identify needs and execute development projects.",
    image: "/assets/departments/rural-dev.jpg",
    phone: "02162-234567",
    email: "rural_dev@wai.gov.in",
    schemesCount: 8,
    hierarchy: [
      {
        title: "Block Development Officer",
        name: "Shri. Vikram Joshi",
        children: [
          {
            title: "Assistant BDO",
            name: "Smt. Priya Kale",
            children: [
              {
                title: "Gram Sevak",
                name: "Shri. Raju Patil",
              },
              {
                title: "Extension Officer",
                name: "Smt. Meena Deshpande",
              },
            ],
          },
          {
            title: "Accountant",
            name: "Shri. Sanjay Pawar",
          },
        ],
      },
      // ... other top-level positions ...
    ],
    gallery: [
      "/images/gallery/rural1.jpg",
      "/images/gallery/rural2.jpg",
      // More images...
    ],
  },
  // More departments...
];

const getAnnouncements = (): Promise<Announcement[]> => {
  // console.log("func called");
  return new Promise((resolve) =>
    setTimeout(() => {
      // console.log("Done");
      return resolve(announcements);
    }, 6000)
  );
};

const Ticker = async () => {
  const data: Announcement[] = await getAnnouncements();
  return <AnnouncementTicker announcements={data} />;
};
const AnnouncementsRender = async () => {
  const data: Announcement[] = await getAnnouncements();
  return <Announcements announcements={data} />;
};

const featuredSchemes = schemes.slice(0, 3);
const featuredDepartments = departments.slice(0, 3);

const page = async () => {
  // const { db } = await connectToDatabase();
  // const data: Announcement[] = db.collection("");

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

        <section
          aria-description="Latest Announcements Section"
          className="mb-12"
        >
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
                schemeId={scheme.id}
                title={scheme.title}
                department={scheme.department}
                description={scheme.description}
                image={scheme.image}
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
            {featuredDepartments.map((dept) => (
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
                    href={`/departments/${dept.id}`}
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
