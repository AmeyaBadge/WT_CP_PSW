"use server";

import prisma from "@/lib/prisma";
import { checkRole } from "@/lib/roles";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const client = await clerkClient();

export const isAdmin = async () => {
  return await checkRole("admin");
};

export const checkApproval = async () => {
  const { sessionClaims } = await auth();
  const approved = sessionClaims?.metadata.approved;
  if (!approved) redirect("/admin/pending-approval");
};

export const setRole = async (formData: FormData) => {
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
export const revokeUser = async (dbId: string) => {
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

    const _res = await client.users.updateUserMetadata(clerkId, {
      publicMetadata: { approved: false },
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

    const user = await prisma.user.update({
      where: {
        id: dbId,
      },
      data: {
        approved: true,
      },
    });

    const _res = await client.users.updateUserMetadata(user.clerkId, {
      publicMetadata: {
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
    const { userId, sessionClaims } = await auth();
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
        departmentId: sessionClaims.metadata.departmentId,
        approved: sessionClaims.metadata.approved,
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

export const getAllUsers = async (onlyUnapproved: boolean = false) => {
  try {
    const admin = await isAdmin();
    if (!admin) throw new Error("Unauthorized access!");

    const dbUserId = await getDbUserId();
    if (!dbUserId) throw new Error("Unauthenticated access not allowed.");

    // const users = await prisma.user.findMany({
    //   select: {
    //     id: true,
    //     image: true,
    //     name: true,
    //     email: true,
    //     approved: true,
    //     department: {
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     },
    //   },
    //   where: {
    //     NOT: { id: dbUserId },
    //   },
    // });

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
        AND: {
          NOT: { id: dbUserId },
          approved: onlyUnapproved ? false : false || true,
        },
      },
    });
    return users;
  } catch (error) {
    console.log("Error fetching users : ", error);
    return [];
  }
};

export const inviteUser = async ({
  email,
  departmentId,
}: {
  email: string;
  departmentId: string;
}) => {
  // const email = formData.get("inviteEmail");
  // const department = formData.get("inviteDepartment");
  if (!email) throw new Error("Email required");
  if (typeof email !== "string") {
    throw new Error("email not string");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) throw new Error("User already exists!");

    const res = await client.invitations.createInvitation({
      emailAddress: email,
      notify: true,
      ignoreExisting: true,
      publicMetadata: {
        role: "moderator",
        approved: false,
        departmentId: departmentId,
      },
    });

    if (res) return { success: true };
  } catch (error) {
    console.log("Error invitingUser :", error);
    return { success: false };
  }
};
