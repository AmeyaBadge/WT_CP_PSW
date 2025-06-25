"use client";

import { useState, useEffect } from "react";

const announcements = [
  "Latest: Applications open for PM Awas Yojana till 30th November 2023.",
  "Notice: Gram Sabha meeting on 15th November at 10 AM in Panchayat Office.",
  "Alert: Water supply will be interrupted on 12th November for maintenance work.",
  "Update: New health camp organized on 20th November at Primary Health Center.",
];

const AnnouncementTicker = () => {
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
                key={index}
                className={`whitespace-nowrap text-govt-dark ${
                  index === currentAnnouncement ? "block" : "hidden"
                }`}
                aria-live="polite"
              >
                {announcement}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
