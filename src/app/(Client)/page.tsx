import AnnouncementTicker from "@/components/AnnouncementTicker";
import { connectToDatabase } from "@/lib/mongodb";
import { Announcement } from "@/models/Announcement_Model";
import Image from "next/image";
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

const getAnnouncements = (): Promise<Announcement[]> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("Done");
      return resolve(announcements);
    }, 6000)
  );
};

const Ticker = async () => {
  const data: Announcement[] = await getAnnouncements();
  return <AnnouncementTicker announcements={data} />;
};

const page = async () => {
  // const { db } = await connectToDatabase();
  // const data: Announcement[] = db.collection("");

  return (
    <>
      <div className="">
        {/* <Suspense
          fallback={
            <div className="bg-govt-saffron text-black py-2 mb-6 overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="flex items-center">
                  <div className="flex-1 text-center">Loading...</div>
                </div>
              </div>
            </div>
          }
        > */}
        <Ticker />
        {/* </Suspense> */}
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
      </div>
    </>
  );
};

export default page;
