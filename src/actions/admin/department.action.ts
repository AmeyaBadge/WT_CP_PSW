"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkRole } from "@/lib/roles";
import { Prisma } from "@/generated/prisma";

export const getCurrentUserDepartmentId = async () => {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    return sessionClaims?.metadata?.departmentId;
  } catch (error) {
    console.log("Error getting user's departmentId : ", error);
    return;
  }
};

const isUserAuthorizedForDepartment = async (departmentId: string) => {
  const { sessionClaims } = await auth();
  const isAdmin = await checkRole("admin");
  const userDepartmentId = sessionClaims?.metadata?.departmentId;

  return isAdmin || userDepartmentId === departmentId;
};

export const getAllDepartments = async () => {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    const isAdmin = await checkRole("admin");
    const userDepartmentId = sessionClaims?.metadata?.departmentId;

    // If admin, get all departments, if moderator, get only their department
    const departments = await prisma.department.findMany({
      where: isAdmin ? undefined : { id: userDepartmentId },
      include: {
        _count: {
          select: {
            schemes: true,
            moderators: true,
          },
        },
      },
    });
    return departments;
  } catch (error) {
    console.log("Error fetching departments: ", error);
    throw new Error("Failed to fetch departments");
  }
};

export const getDepartmentById = async (id: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    // Check if user has permission to view this department
    const isAuthorized = await isUserAuthorizedForDepartment(id);
    if (!isAuthorized)
      throw new Error("You don't have permission to view this department");

    const department = await prisma.department.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            schemes: true,
            moderators: true,
          },
        },
        schemes: true,
        moderators: true,
      },
    });
    return department;
  } catch (error) {
    console.log("Error fetching department: ", error);
    throw new Error("Failed to fetch department");
  }
};

// Type for hierarchy node
interface HierarchyNode {
  title: string;
  name: string;
  children?: HierarchyNode[];
}

const toPrismaJsonHierarchy = (
  hierarchy?: HierarchyNode[],
): Prisma.InputJsonValue | undefined => {
  if (hierarchy === undefined) return undefined;

  // Convert to plain JSON-compatible input shape for Prisma Json fields.
  return JSON.parse(JSON.stringify(hierarchy)) as Prisma.InputJsonValue;
};

export const createDepartment = async (data: {
  name: string;
  slug: string;
  description: string;
  contact: string;
  image: string;
  hierarchy?: HierarchyNode[];
}) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    // Only admin can create departments
    const isAdmin = await checkRole("admin");
    if (!isAdmin) throw new Error("Only administrators can create departments");

    const createData: Prisma.DepartmentCreateInput = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      contact: data.contact,
      image: data.image,
      hierarchy: toPrismaJsonHierarchy(data.hierarchy),
    };

    const department = await prisma.department.create({
      data: createData,
    });

    revalidatePath("/admin/dashboard/departments");
    return department;
  } catch (error) {
    console.log("Error creating department: ", error);
    throw new Error("Failed to create department");
  }
};

export const generateDepartmentSlug = async (
  name: string,
  excludeId?: string,
) => {
  try {
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existingDepartment = await prisma.department.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (
        !existingDepartment ||
        (excludeId && existingDepartment.id === excludeId)
      ) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  } catch (error) {
    console.error("Error generating department slug:", error);
    throw new Error("Failed to generate department slug");
  }
};

export const updateDepartment = async (
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    contact?: string;
    image?: string;
    hierarchy?: HierarchyNode[];
  },
) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    // Check if user has permission to edit this department
    const isAuthorized = await isUserAuthorizedForDepartment(id);
    if (!isAuthorized)
      throw new Error("You don't have permission to edit this department");

    const updateData: Prisma.DepartmentUpdateInput = {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.contact !== undefined ? { contact: data.contact } : {}),
      ...(data.image !== undefined ? { image: data.image } : {}),
      ...(data.hierarchy !== undefined
        ? { hierarchy: toPrismaJsonHierarchy(data.hierarchy) }
        : {}),
    };

    const department = await prisma.department.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/dashboard/departments");
    revalidatePath(`/admin/dashboard/departments/${id}`);
    return department;
  } catch (error) {
    console.log("Error updating department: ", error);
    throw new Error("Failed to update department");
  }
};
