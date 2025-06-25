import AnnouncementTicker from "@/components/AnnouncementTicker";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="">
        <AnnouncementTicker />
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
