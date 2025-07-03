"use server";

import prisma from "@/lib/prisma";
import { checkRole } from "@/lib/roles";
import { auth, currentUser } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  return await checkRole("admin");
};

export const syncUser = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    //check if user already exists.
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return;

    await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return;
  } catch (error) {
    console.log("Error in SyncUser : ", error);
    throw new Error("Something went wrong syncing user.");
  }
};

//Get the posgres document Id from ClerkId
export const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      id: true,
    },
  });

  if (!user) throw new Error("User not found!");

  return user.id;
};
