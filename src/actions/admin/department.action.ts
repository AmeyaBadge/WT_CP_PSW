"use server";

import { auth } from "@clerk/nextjs/server";

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
