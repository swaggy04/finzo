"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      console.warn("No current user found");
      return null;
    }

    // Try to find existing user
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create new user
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name,
        imageUrl: user.imageUrl,
      },
    });

    return newUser;

  } catch (error) {
    console.error("checkUser failed:", error?.message || error);
    // Always return something safe to prevent blank render errors
    throw new Error("Failed to check or create user");
  }
};
