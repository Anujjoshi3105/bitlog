"use server";

import { findUserByEmail } from "@/actions/auth/queries";
import { userMail } from "@/lib/nodemailer";
import { forgotPasswordSchema } from "@/lib/validators/forgot-password";
import { createVerificationToken } from "@/utils/verificationToken";
import * as v from "valibot";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

/**
 * Handles forgot password request
 * @param values - Form values
 * @returns
 * - success: true - if the user doesn't exist (to prevent information leaks) or the password reset is initiated
 * - success: false, error: v.FlatErrors<undefined>, statusCode: 400 - if the form values are invalid
 * - success: false, error: string, statusCode: 401 - if the user was created with OAuth
 * - success: false, error: string, statusCode: 500 - if there is an internal server error
 */
export async function forgotPassword(values: unknown): Promise<Res> {
  const { success, output, issues } = v.safeParse(forgotPasswordSchema, values);

  if (!success) {
    const flatErrors = v.flatten(issues);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { email } = output;

  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser?.id) return { success: true };
    if (!existingUser.password) {
      return {
        success: false,
        error: "This user was created with OAuth, please sign in with OAuth",
        statusCode: 401,
      };
    }

    const verificationToken = await createVerificationToken(existingUser.email);

    await userMail(
      "forgot",
      existingUser.email,
      `${process.env.AUTH_URL}/en/auth/reset-password/${verificationToken.token}`
    );

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
