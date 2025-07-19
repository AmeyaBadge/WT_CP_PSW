"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Create gallery entry for a scheme
export const createSchemeGallery = async (schemeId: string, url: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    const gallery = await prisma.gallery.create({
      data: {
        url,
        type: "Scheme",
        schemeId,
      },
    });

    return gallery;
  } catch (error) {
    console.log("Error creating scheme gallery: ", error);
    throw error;
  }
};

// Get gallery images for a scheme
export const getSchemeGallery = async (schemeId: string) => {
  try {
    const gallery = await prisma.gallery.findMany({
      where: {
        schemeId,
        type: "Scheme",
      },
      orderBy: {
        url: "asc",
      },
    });

    return gallery;
  } catch (error) {
    console.log("Error fetching scheme gallery: ", error);
    return [];
  }
};

// Update scheme gallery (replace main image)
export const updateSchemeGallery = async (schemeId: string, oldUrl: string | null, newUrl: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    // If there's an old URL, delete the old gallery entry
    if (oldUrl) {
      await prisma.gallery.deleteMany({
        where: {
          schemeId,
          url: oldUrl,
          type: "Scheme",
        },
      });
    }

    // Create new gallery entry
    const gallery = await createSchemeGallery(schemeId, newUrl);
    return gallery;
  } catch (error) {
    console.log("Error updating scheme gallery: ", error);
    throw error;
  }
};

// Delete gallery entry
export const deleteSchemeGallery = async (schemeId: string, url: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    await prisma.gallery.deleteMany({
      where: {
        schemeId,
        url,
        type: "Scheme",
      },
    });

    return { success: true };
  } catch (error) {
    console.log("Error deleting scheme gallery: ", error);
    throw error;
  }
};
