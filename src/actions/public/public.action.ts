"use server";

import prisma from "@/lib/prisma";

// Get all departments for public display
export const getPublicDepartments = async () => {
  try {
    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        contact: true,
        _count: {
          select: {
            schemes: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return departments.map((dept) => ({
      ...dept,
      schemesCount: dept._count.schemes,
    }));
  } catch (error) {
    console.log("Error fetching public departments: ", error);
    return [];
  }
};

// Get department by slug for public display
export const getPublicDepartmentBySlug = async (slug: string) => {
  try {
    const department = await prisma.department.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        contact: true,
        hierarchy: true,
        schemes: {
          select: {
            id: true,
            name: true,
            slug: true,
            shortDesc: true,
            image: true,
            type: true,
            deadline: true,
          },
          orderBy: {
            name: "asc",
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return department;
  } catch (error) {
    console.log("Error fetching public department: ", error);
    return null;
  }
};

// Get all schemes for public display
export const getPublicSchemes = async (filters?: {
  departmentId?: string;
  type?: string;
  search?: string;
}) => {
  try {
    const where: Record<string, unknown> = {};

    if (filters?.departmentId) {
      where.departmentId = filters.departmentId;
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.search) {
      where.OR = [
        {
          name: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          shortDesc: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const schemes = await prisma.scheme.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        shortDesc: true,
        image: true,
        type: true,
        deadline: true,
        department: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
        // name: "asc",
      },
    });

    return schemes;
  } catch (error) {
    console.log("Error fetching public schemes: ", error);
    return [];
  }
};

// Get scheme by slug for public display
export const getPublicSchemeBySlug = async (slug: string) => {
  try {
    const scheme = await prisma.scheme.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
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
            slug: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return scheme;
  } catch (error) {
    console.log("Error fetching public scheme: ", error);
    return null;
  }
};

// Get announcements for public display
export const getPublicAnnouncements = async (limit?: number) => {
  try {
    const announcements = await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        type: true,
        createdAt: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return announcements;
  } catch (error) {
    console.log("Error fetching public announcements: ", error);
    return [];
  }
};

// Get featured schemes for homepage
export const getFeaturedSchemes = async (limit: number = 6) => {
  try {
    const schemes = await prisma.scheme.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        shortDesc: true,
        image: true,
        type: true,
        deadline: true,
        department: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return schemes;
  } catch (error) {
    console.log("Error fetching featured schemes: ", error);
    return [];
  }
};
