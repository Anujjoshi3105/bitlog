"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { and, eq, isNull } from "drizzle-orm";

/**
 * Initiates an OAuth login flow with the given provider.
 *
 * @param {string} provider the name of the OAuth provider to use
 * @throws {Error} if the provider is not "google" or "github"
 * @throws {RedirectError} if the user needs to be redirected to the provider's
 *     login page
 */
export async function oauthLogin(provider: string) {
  if (
    provider !== "google" &&
    provider !== "github" &&
    provider !== "discord" &&
    provider !== "twitter"
  )
    throw new Error("Invalid provider");

  try {
    await signIn(provider, { redirectTo: "/en/dashboard" });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error(err);
  }
}

/**
 * Verifies a user's email if they signed up with an OAuth provider.
 * This will check if there is an existing user with the same email
 * address that has not set a password and has not verified their
 * email address previously. If such a user exists, the email address
 * will be marked as verified.
 * @param {string} email - The email address to verify
 * @throws {Error} If there is an error with the database
 */
export async function oauthVerifyEmail(email: string) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.email, email),
        isNull(users.password),
        isNull(users.emailVerified)
      )
    )
    .then((res) => res[0] ?? null);

  if (existingUser?.id) {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));
  }
}
