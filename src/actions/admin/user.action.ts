"use server";

import prisma from "@/lib/prisma";
import { checkRole } from "@/lib/roles";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { revalidatePath } from "next/cache";

export const isAdmin = async () => {
  return await checkRole("admin");
};

export const setRole = async (formData: FormData) => {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
};

// Change the role in metadata and remove the department from the user table record
export const removeRole = async (dbId: string) => {
  try {
    if (!(await isAdmin())) throw new Error("Unauthorized access.");
    if (!dbId) throw new Error("Id required");

    const modifiedUser = await prisma.user.update({
      data: {
        departmentId: null,
        approved: false,
      },
      where: {
        id: dbId,
      },
    });

    const clerkId = modifiedUser.clerkId;

    const client = await clerkClient();

    const _res = await client.users.updateUserMetadata(clerkId, {
      publicMetadata: { role: null },
    });

    revalidatePath("/");
  } catch (err) {
    console.log("Error removing role: ", err);
    throw err;
  }
};

export const approveUser = async (dbId: string, _formData: FormData) => {
  try {
    if (!(await isAdmin())) throw new Error("Unauthorized access.");

    if (!dbId) throw new Error("Id required");

    const _user = await prisma.user.update({
      where: {
        id: dbId,
      },
      data: {
        approved: true,
      },
    });

    revalidatePath("/");
    return;
  } catch (error) {
    console.log("Error approving user : ", error);
    return;
  }
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

export const getAllUsers = async () => {
  try {
    const admin = await isAdmin();
    if (!admin) throw new Error("Unauthorized access!");

    const dbUserId = await getDbUserId();
    if (!dbUserId) throw new Error("Unauthenticated access not allowed.");

    const users = await prisma.user.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        approved: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        NOT: { id: dbUserId },
      },
    });

    return users;
  } catch (error) {
    console.log("Error fetching users : ", error);
    return [];
  }
};
