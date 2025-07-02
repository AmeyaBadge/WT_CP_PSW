"use server";

import prisma from "@/lib/prisma";

export const getLatestAnnouncements = async () => {
  try {
    const announcements = await prisma.announcement.findMany({
      select: {
        // id: true,
        // content: true,
        // type: true,
        // creator: {
        //   select: {
        //     name: true,
        //   },
        // },
        // createdAt: true,
        id: true,
        title: true,
        content: true,
        createdAt: true,
        type: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return announcements;
  } catch (error) {
    console.log("Error fetching notifications : ", error);
    return [];
  }
};
