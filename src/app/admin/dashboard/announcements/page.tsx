export const dynamic = "force-dynamic";

import { getAllAnnouncements } from "@/actions/admin/announcement.action";
import { Heading } from "@/components/admin/Heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";
import { AnnouncementDataTable } from "./data-table";
import { announcementColumns } from "./columns";
import { AnnouncementType } from "@/generated/prisma";
import CreateAnnouncementDialog from "@/components/admin/CreateAnnouncementDialog";

export const metadata: Metadata = {
  title: "Announcements",
};

function transformData(
  inputArray: {
    id: string;
    title: string;
    content: string | null;
    type: string; // or use the actual enum type if defined
    creator: { name: string };
    createdAt: Date;
  }[]
) {
  return inputArray.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    type: item.type as AnnouncementType,
    creator: item.creator.name,
    createdAt: new Date(item.createdAt).toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
    }),
  }));
}

const AnnouncmenetsPage = async () => {
  const data = await getAllAnnouncements();
  const announcements = transformData(data);

  return (
    <div className="w-full space-y-4">
      <div className="flex-1 flex justify-between">
        <Heading
          title="Announcements"
          description="Manage latest updates, alerts and notices."
        />

        {/* Create new announcement dialog */}
        <CreateAnnouncementDialog />
      </div>
      <Separator />
      <AnnouncementDataTable
        columns={announcementColumns}
        data={announcements}
      />
    </div>
  );
};

export default AnnouncmenetsPage;
