"use client";

import { getLatestAnnouncements } from "@/actions/client/announcement.action";
import { useState, useEffect } from "react";

type AnnouncementType = Awaited<ReturnType<typeof getLatestAnnouncements>>[0];

const AnnouncementTicker = ({
  announcements,
}: {
  announcements: AnnouncementType[];
}) => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="bg-govt-saffron text-white py-2 mb-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="font-bold mr-4">{/* Latest: */}</span>
          <div className="flex-1 text-center">
            {announcements.map((item, index) => (
              <p
                key={item.id}
                className={`whitespace-nowrap text-govt-dark ${
                  index === currentAnnouncement ? "block" : "hidden"
                }`}
                aria-live="polite"
              >
                {item.type}: {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
