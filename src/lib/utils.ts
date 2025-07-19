import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug for schemes that doesn't exist in the database
 */
export async function generateUniqueSchemeSlug(
  name: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = generateSlugFromName(name);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if slug exists in database
    const existingScheme = await prisma.scheme.findUnique({
      where: { slug },
      select: { id: true },
    });

    // If no existing scheme found, or found but it's the same scheme we're updating
    if (!existingScheme || (excludeId && existingScheme.id === excludeId)) {
      return slug;
    }

    // Generate new slug with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Generate a unique slug for departments that doesn't exist in the database
 */
export async function generateUniqueDepartmentSlug(
  name: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = generateSlugFromName(name);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if slug exists in database
    const existingDepartment = await prisma.department.findUnique({
      where: { slug },
      select: { id: true },
    });

    // If no existing department found, or found but it's the same department we're updating
    if (
      !existingDepartment ||
      (excludeId && existingDepartment.id === excludeId)
    ) {
      return slug;
    }

    // Generate new slug with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
