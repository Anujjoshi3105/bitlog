"use server";

import { users, verificationTokens } from "@/drizzle/schema";
import * as v from "valibot";
import db from "@/drizzle";
import { eq } from "drizzle-orm";
import { ResetPasswordSchema } from "@/lib/validators/reset-password";
import { findVerificationTokenByToken } from "@/utils/verificationToken";
import { findUserByEmail } from "./queries";
import { hash } from "bcryptjs";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

/**
 * Handles reset password request
 * @param email - Email of the user
 * @param token - Verification token
 * @param values - Form values
 * @returns
 * - success: true - if the password is reset
 * - success: false, error: v.FlatErrors<undefined>, statusCode: 400 - if the form values are invalid
 * - success: false, error: string, statusCode: 401 - if the token is invalid or expired
 * - success: false, error: string, statusCode: 500 - if there is an internal server error
 */
export async function resetPasswordAction(
  email: (typeof users.$inferSelect)["email"],
  token: (typeof verificationTokens.$inferSelect)["token"],
  values: unknown
): Promise<Res> {
  const { success, output, issues } = v.safeParse(ResetPasswordSchema, values);

  if (!success) {
    const flatErrors = v.flatten(issues);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { password } = output;
  const existingToken = await findVerificationTokenByToken(token);

  if (!existingToken?.expires) {
    return {
      success: false,
      error: "Token is invalid",
      statusCode: 401,
    };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return {
      success: false,
      error: "Token is expired",
      statusCode: 401,
    };
  }

  const existingUser = await findUserByEmail(email);

  if (
    !existingUser?.password ||
    existingUser.email !== existingToken.identifier
  ) {
    return {
      success: false,
      error: "Oops, something went wrong",
      statusCode: 401,
    };
  }

  try {
    const hashedPassword = await hash(password, 10);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
