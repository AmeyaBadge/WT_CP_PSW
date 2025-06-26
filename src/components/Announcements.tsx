import { Announcement } from "@/models/Announcement_Model";
import React from "react";

// const announcements = [
//   {
//     id: 1,
//     title: "Gram Panchayat Elections 2023",
//     date: "2023-10-15",
//     link: "#",
//   },
//   {
//     id: 2,
//     title: "Water Conservation Program Meeting",
//     date: "2023-10-20",
//     link: "#",
//   },
//   {
//     id: 3,
//     title: "New Agricultural Subsidy Scheme",
//     date: "2023-10-25",
//     link: "#",
//   },
// ];

const Announcements = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  return (
    <section aria-labelledby="announcements-heading">
      <div className="card">
        <h2 id="announcements-heading" className="text-xl font-bold mb-4">
          Latest Announcements
        </h2>
        <ul className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            // <li key={announcement.id} className="py-3">
            <li key={announcement.content} className="py-3">
              <a
                // href={announcement.link}
                href={"#"}
                className="flex flex-col md:flex-row justify-between md:items-center hover:text-govt-blue transition-colors"
              >
                <span>{announcement.content}</span>
                <span className="text-sm text-gray-500">
                  {new Date(announcement.date).toLocaleDateString("en-IN")}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <a
            href="/announcements"
            className="text-govt-blue hover:underline font-medium"
          >
            View all announcements →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
