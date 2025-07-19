"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getDbUserId, isAdmin } from "./user.action";
import { getCurrentUserDepartmentId } from "./department.action";
import { revalidatePath } from "next/cache";
import { SchemeType, GalleryType } from "@/generated/prisma";
import { generateUniqueSchemeSlug } from "@/lib/utils";
import {
  deleteImageFromCloudinary,
  deleteMultipleImagesFromCloudinary,
} from "@/lib/cloudinary";

// Get all schemes (Admin only - sees all schemes)
export const getAllSchemes = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    // Check if user is admin
    if (!(await isAdmin())) throw new Error("Admin access required!");

    const schemes = await prisma.scheme.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        shortDesc: true,
        description: true,
        image: true,
        type: true,
        eligibility: true,
        deadline: true,
        benifits: true,
        howToApply: true,
        documentsReq: true,
        applyLink: true,
        applicationFormLink: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return schemes;
  } catch (error) {
    console.log("Error fetching all schemes: ", error);
    return [];
  }
};

// Get schemes by department (Moderator - sees only their department schemes)
export const getDepartmentSchemes = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    const departmentId = await getCurrentUserDepartmentId();
    if (!departmentId) throw new Error("No department assigned!");

    const schemes = await prisma.scheme.findMany({
      where: {
        departmentId: departmentId,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        shortDesc: true,
        description: true,
        image: true,
        type: true,
        eligibility: true,
        deadline: true,
        benifits: true,
        howToApply: true,
        documentsReq: true,
        applyLink: true,
        applicationFormLink: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return schemes;
  } catch (error) {
    console.log("Error fetching department schemes: ", error);
    return [];
  }
};

// Get schemes based on user role (Admin gets all, Moderator gets department-specific)
export const getSchemes = async () => {
  try {
    if (await isAdmin()) {
      return await getAllSchemes();
    } else {
      return await getDepartmentSchemes();
    }
  } catch (error) {
    console.log("Error fetching schemes: ", error);
    return [];
  }
};

// Get single scheme by ID
export const getSchemeById = async (id: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    // Get user's department for access control
    const userDepartmentId = await getCurrentUserDepartmentId();
    const isUserAdmin = await isAdmin();

    const scheme = await prisma.scheme.findUnique({
      where: { id },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
    });

    if (!scheme) throw new Error("Scheme not found!");

    // Check if user has access to this scheme
    if (!isUserAdmin && scheme.departmentId !== userDepartmentId) {
      throw new Error("Access denied to this scheme!");
    }

    return scheme;
  } catch (error) {
    console.log("Error fetching scheme: ", error);
    return null;
  }
};

// Create new scheme
export const createScheme = async (formData: FormData) => {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("Unauthorized access!");

    // Get form data
    const name = formData.get("name") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string; // Cover image
    const type = formData.get("type") as SchemeType;
    const eligibility = formData.get("eligibility") as string;
    const deadline = formData.get("deadline") as string;
    const benifits = formData.get("benifits") as string;
    const howToApply = formData.get("howToApply") as string;
    const documentsReq = formData.get("documentsReq") as string;
    const applyLink = formData.get("applyLink") as string;
    const applicationFormLink = formData.get("applicationFormLink") as string;
    const galleryImages = formData.get("galleryImages") as string;

    console.log("Cover image received:", image);

    // Parse gallery images
    let imageUrls: string[] = [];
    if (galleryImages) {
      try {
        imageUrls = JSON.parse(galleryImages);
        console.log("Parsed gallery images:", imageUrls);
      } catch (error) {
        console.log("Error parsing gallery images:", error);
      }
    } else {
      console.log("No gallery images provided");
    }

    // Determine department ID
    let departmentId: string;
    if (await isAdmin()) {
      // Admin can create schemes for any department
      departmentId = formData.get("departmentId") as string;
    } else {
      // Moderator can only create schemes for their department
      const userDeptId = await getCurrentUserDepartmentId();
      if (!userDeptId) throw new Error("No department assigned!");
      departmentId = userDeptId;
    }

    // Validate required fields
    if (!name || !shortDesc || !description || !departmentId || !type) {
      throw new Error("Please fill in all required fields!");
    }

    // Generate unique slug
    const slug = await generateUniqueSchemeSlug(name);

    // Create scheme with gallery images in transaction
    const _scheme = await prisma.$transaction(async (tx) => {
      const newScheme = await tx.scheme.create({
        data: {
          name,
          slug,
          shortDesc,
          description,
          image: image || null, // Cover image
          type,
          eligibility: eligibility || null,
          deadline: deadline ? new Date(deadline) : null,
          benifits: benifits || null,
          howToApply: howToApply || null,
          documentsReq: documentsReq || null,
          applyLink: applyLink || null,
          applicationFormLink: applicationFormLink || null,
          departmentId,
          creatorId: userId,
        },
      });

      // Create gallery images if any
      if (imageUrls.length > 0) {
        console.log("Creating gallery images for scheme:", newScheme.id);
        await tx.gallery.createMany({
          data: imageUrls.map((imageUrl) => ({
            schemeId: newScheme.id,
            url: imageUrl,
            type: GalleryType.Scheme,
          })),
        });
      }

      return newScheme;
    });

    revalidatePath("/admin/dashboard/schemes");
    return { success: true, message: "Scheme created successfully!" };
  } catch (error) {
    console.log("Error creating scheme: ", error);
    return {
      success: false,
      message: error || "Failed to create scheme",
    };
  }
};

// Update existing scheme
export const updateScheme = async (id: string, formData: FormData) => {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("Unauthorized access!");

    // Check if scheme exists and user has access
    const existingScheme = await getSchemeById(id);
    if (!existingScheme) throw new Error("Scheme not found!");

    // Get form data
    const name = formData.get("name") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string; // Cover image
    const type = formData.get("type") as SchemeType;
    const eligibility = formData.get("eligibility") as string;
    const deadline = formData.get("deadline") as string;
    const benifits = formData.get("benifits") as string;
    const howToApply = formData.get("howToApply") as string;
    const documentsReq = formData.get("documentsReq") as string;
    const applyLink = formData.get("applyLink") as string;
    const applicationFormLink = formData.get("applicationFormLink") as string;
    const galleryImages = formData.get("galleryImages") as string;

    console.log("Cover image received for update:", image);

    // Parse gallery images
    let imageUrls: string[] = [];
    if (galleryImages) {
      try {
        imageUrls = JSON.parse(galleryImages);
        console.log("Parsed gallery images for update:", imageUrls);
      } catch (error) {
        console.log("Error parsing gallery images:", error);
      }
    }

    // Determine department ID (only admin can change department)
    let departmentId = existingScheme.departmentId;
    if (await isAdmin()) {
      const newDeptId = formData.get("departmentId") as string;
      if (newDeptId) departmentId = newDeptId;
    }

    // Validate required fields
    if (!name || !shortDesc || !description || !type) {
      throw new Error("Please fill in all required fields!");
    }

    // Generate unique slug if name changed
    let slug = existingScheme.slug;
    if (name !== existingScheme.name) {
      slug = await generateUniqueSchemeSlug(name, id);
    }

    // Update scheme and gallery images in transaction
    const oldCoverImage = existingScheme.image;
    const oldGalleryImages = existingScheme.images?.map((img) => img.url) || [];

    await prisma.$transaction(async (tx) => {
      // Update scheme
      await tx.scheme.update({
        where: { id },
        data: {
          name,
          slug,
          shortDesc,
          description,
          image: image || null,
          type,
          eligibility: eligibility || null,
          deadline: deadline ? new Date(deadline) : null,
          benifits: benifits || null,
          howToApply: howToApply || null,
          documentsReq: documentsReq || null,
          applyLink: applyLink || null,
          applicationFormLink: applicationFormLink || null,
          departmentId,
        },
      });

      // Delete existing gallery images
      await tx.gallery.deleteMany({
        where: { schemeId: id },
      });

      // Create new gallery images if any
      if (imageUrls.length > 0) {
        await tx.gallery.createMany({
          data: imageUrls.map((imageUrl) => ({
            schemeId: id,
            url: imageUrl,
            type: GalleryType.Scheme,
          })),
        });
      }
    });

    // Clean up old images from Cloudinary (don't block the response)
    const imagesToDelete: string[] = [];

    // Check if cover image changed and delete old one
    if (oldCoverImage && oldCoverImage !== image) {
      imagesToDelete.push(oldCoverImage);
    }

    // Find removed gallery images
    const removedGalleryImages = oldGalleryImages.filter(
      (oldUrl) => !imageUrls.includes(oldUrl)
    );
    imagesToDelete.push(...removedGalleryImages);

    // Delete removed images from Cloudinary
    if (imagesToDelete.length > 0) {
      deleteMultipleImagesFromCloudinary(imagesToDelete)
        .then((result) => {
          console.log(
            `Cloudinary cleanup: ${result.success} deleted, ${result.failed} failed`
          );
        })
        .catch((error) => {
          console.error("Error cleaning up Cloudinary images:", error);
        });
    }

    revalidatePath("/admin/dashboard/schemes");
    revalidatePath(`/admin/dashboard/schemes/${id}`);
    return { success: true, message: "Scheme updated successfully!" };
  } catch (error) {
    console.log("Error updating scheme: ", error);
    return {
      success: false,
      message: error || "Failed to update scheme",
    };
  }
};

// Delete scheme
export const deleteScheme = async (id: string) => {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("Unauthorized access!");

    // Check if scheme exists and user has access
    const existingScheme = await getSchemeById(id);
    if (!existingScheme) throw new Error("Scheme not found!");

    // Collect all image URLs that need to be deleted from Cloudinary
    const imagesToDelete: string[] = [];

    // Add cover image if it exists
    if (existingScheme.image) {
      imagesToDelete.push(existingScheme.image);
    }

    // Add gallery images if they exist
    if (existingScheme.images && existingScheme.images.length > 0) {
      existingScheme.images.forEach((img) => {
        imagesToDelete.push(img.url);
      });
    }

    // Delete the scheme from database (this will also delete gallery images due to cascade)
    await prisma.scheme.delete({
      where: { id },
    });

    // Delete images from Cloudinary (don't block the response if this fails)
    if (imagesToDelete.length > 0) {
      deleteMultipleImagesFromCloudinary(imagesToDelete)
        .then((result) => {
          console.log(
            `Cloudinary cleanup: ${result.success} deleted, ${result.failed} failed`
          );
        })
        .catch((error) => {
          console.error("Error cleaning up Cloudinary images:", error);
        });
    }

    revalidatePath("/admin/dashboard/schemes");
    return { success: true, message: "Scheme deleted successfully!" };
  } catch (error) {
    console.log("Error deleting scheme: ", error);
    return {
      success: false,
      message: error || "Failed to delete scheme",
    };
  }
};

// Remove individual gallery image
export const removeGalleryImage = async (imageId: string) => {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("Unauthorized access!");

    // Get the image to delete from Cloudinary
    const galleryImage = await prisma.gallery.findUnique({
      where: { id: imageId },
      include: {
        scheme: {
          select: {
            id: true,
            departmentId: true,
          },
        },
      },
    });

    if (!galleryImage) {
      throw new Error("Gallery image not found!");
    }

    // Check if user has access to this scheme
    const isUserAdmin = await isAdmin();
    const userDepartmentId = await getCurrentUserDepartmentId();

    if (
      !isUserAdmin &&
      galleryImage.scheme?.departmentId !== userDepartmentId
    ) {
      throw new Error("Access denied to this scheme!");
    }

    // Delete from database
    await prisma.gallery.delete({
      where: { id: imageId },
    });

    // Delete from Cloudinary (don't block the response if this fails)
    deleteImageFromCloudinary(galleryImage.url)
      .then((success) => {
        if (success) {
          console.log("Successfully deleted gallery image from Cloudinary");
        } else {
          console.error("Failed to delete gallery image from Cloudinary");
        }
      })
      .catch((error) => {
        console.error("Error deleting gallery image from Cloudinary:", error);
      });

    revalidatePath("/admin/dashboard/schemes");
    return { success: true, message: "Gallery image removed successfully!" };
  } catch (error) {
    console.log("Error removing gallery image: ", error);
    return {
      success: false,
      message: error || "Failed to remove gallery image",
    };
  }
};

// Get all departments (for dropdown in forms)
export const getDepartments = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized access!");

    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return departments;
  } catch (error) {
    console.log("Error fetching departments: ", error);
    return [];
  }
};
