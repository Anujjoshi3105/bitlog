import "server-only";

import db from "@/drizzle";
import { lower, users, adminUserEmailAddresses } from "@/drizzle/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { USER_ROLES } from "@/lib/constants";
import { auth } from "@/auth";

/**
 * Finds all admin user email addresses
 *
 * @returns {Promise<string[]>}
 */
export const findAdminUserEmailAddresses = async () => {
  const adminUserEmailAddress = await db
    .select({ email: lower(adminUserEmailAddresses.email) })
    .from(adminUserEmailAddresses);

  return adminUserEmailAddress.map((item) => item.email as string);
};

/**
 * Finds all users in the database.
 *
 * @returns {Promise<UserWithoutPassword[]>}
 */
export async function findAllUsers() {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) {
    throw new Error("Unauthorized");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = getTableColumns(users);

  const allUsers = await db
    .select({ ...rest })
    .from(users)
    .orderBy(desc(users.role));

  return allUsers;
}

export const findUserByEmail = async (
  email: string
): Promise<typeof users.$inferSelect | null> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()))
    .then((res) => res[0] ?? null);

  return user;
};
