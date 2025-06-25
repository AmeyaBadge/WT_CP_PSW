"use client";

import { Announcement } from "@/models/Announcement_Model";
import { useState, useEffect } from "react";

const AnnouncementTicker = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-govt-saffron text-white py-2 mb-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="font-bold mr-4">{/* Latest: */}</span>
          <div className="flex-1 text-center">
            {announcements.map((announcement, index) => (
              <p
                key={announcement.content}
                className={`whitespace-nowrap text-govt-dark ${
                  index === currentAnnouncement ? "block" : "hidden"
                }`}
                aria-live="polite"
              >
                {announcement.content}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
