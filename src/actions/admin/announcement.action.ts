"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export const getAllAnnouncements = async () => {
  try {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) throw new Error("Unauthorized Access!");

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
    });

    return announcements;
  } catch (error) {
    console.log("Error fetching notifications : ", error);
    return [];
  }
};

export const createAnnouncement = async (formData: FormData) => {
  try {
    const creatorId = await getDbUserId();
    if (!creatorId) throw new Error("Unauthorized access!");
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as "Alert" | "Update" | "Notice";
    if (
      !title ||
      !type ||
      !content ||
      (type !== "Alert" && type !== "Update" && type != "Notice")
    )
      throw new Error("Invalid data!");
    await prisma.announcement.create({
      data: {
        title,
        type,
        content,
        creatorId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("Error creating Announcement :", error);
  }
};

export const updateAnnouncement = async (id: string, formData: FormData) => {
  try {
    const creatorId = await getDbUserId();
    if (!creatorId) throw new Error("Unauthorized access!");
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as "Alert" | "Update" | "Notice";
    if (
      !title ||
      !type ||
      !content ||
      (type !== "Alert" && type !== "Update" && type != "Notice")
    )
      throw new Error("Invalid data!");
    await prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title,
        type,
        content,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("Error updating Announcement :", error);
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access");

    if (!id) throw new Error("Id required to delete announcement");

    const announcement = await prisma.announcement.delete({ where: { id } });

    revalidatePath("/");

    return announcement;
  } catch (error) {
    console.log("Error deleting Announcement: ", error);
    return;
  }
};
