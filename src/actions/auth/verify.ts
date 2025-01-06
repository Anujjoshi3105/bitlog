"use server";

import db from "@/drizzle";
import { users, verificationTokens } from "@/drizzle/schema";
import { findVerificationTokenByToken } from "@/utils/verificationToken";
import { eq } from "drizzle-orm";
import { findUserByEmail } from "./queries";

/**
 * Verifies the user's email using the given verification token.
 * @param token - The verification token
 * @returns { success: boolean } - Success if the email was verified
 */
export async function verifyCredentialsEmail(
  token: (typeof verificationTokens.$inferSelect)["token"]
) {
  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken?.expires) return { success: false };

  if (new Date(verificationToken.expires) < new Date()) {
    return { success: false };
  }

  const existingUser = await findUserByEmail(verificationToken.identifier);

  if (
    existingUser?.id &&
    !existingUser.emailVerified &&
    existingUser.email === verificationToken.identifier
  ) {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));

    await db
      .update(verificationTokens)
      .set({ expires: new Date() })
      .where(eq(verificationTokens.identifier, existingUser.email));

    return { success: true };
  } else {
    return { success: false };
  }
}
