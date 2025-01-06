import db from "@/drizzle";
import { verificationTokens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Finds a verification token by its token string.
 *
 * @param token - The token string to search for in the verification tokens table.
 * @returns The verification token object if found, otherwise null.
 */
export async function findVerificationTokenByToken(
  token: (typeof verificationTokens.$inferSelect)["token"]
): Promise<typeof verificationTokens.$inferSelect | null> {
  const verificationToken = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .then((res) => res[0] ?? null);

  return verificationToken;
}

/**
 * Creates a new verification token for a given identifier.
 *
 * @param identifier - The unique identifier for which the verification token is created.
 * @returns An object containing the newly created verification token.
 */
export async function createVerificationToken(
  identifier: (typeof verificationTokens.$inferSelect)["identifier"]
) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const token = Math.random().toString(36).substring(2);

  const verificationToken = await db
    .insert(verificationTokens)
    .values({ expires, identifier, token })
    .returning({ token: verificationTokens.token })
    .then((res) => res[0]);

  return verificationToken;
}
