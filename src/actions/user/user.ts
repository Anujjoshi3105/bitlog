"use server";

import { auth } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq, getTableColumns } from "drizzle-orm";

type UserWithoutPassword = Omit<typeof users.$inferSelect, "password">;

/**
 * Finds a user by their authentication ID.
 *
 * @param id - The ID of the user to find.
 * @returns The user object without the password field.
 * @throws Will throw an error if the session user ID does not match the provided ID.
 * @throws Will throw an error if the user is not found.
 */
export const findUserByAuth = async (
  id: string
): Promise<UserWithoutPassword> => {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  if (sessionUserId !== id) throw new Error("Unauthorized");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...rest } = getTableColumns(users);
  const user = await db
    .select(rest)
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
    .then(([user]) => user ?? null);
  if (!user) throw new Error("User not found");
  return user;
};
