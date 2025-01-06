"use server";

import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import * as v from "valibot";
import { registerSchema } from "@/lib/validators/register";
import { eq } from "drizzle-orm";
import { USER_ROLES } from "@/lib/constants";
import { findAdminUserEmailAddresses } from "./queries";
import { createVerificationToken } from "@/utils/verificationToken";
import { userMail } from "@/lib/nodemailer";
import { hash } from "bcryptjs";

type Res =
  | { success: true }
  | {
      success: false;
      error: v.FlatErrors<undefined> | string;
      statusCode: 400 | 401 | 403 | 409 | 500;
    };

/**
 * Handles register request
 * @param values - Form values
 * @returns
 * - success: true - if the user is created
 * - success: false, error: v.FlatErrors<undefined>, statusCode: 400 - if the form values are invalid
 * - success: false, error: string, statusCode: 403 - if the user exists but not verified
 * - success: false, error: string, statusCode: 409 - if the email already exists
 * - success: false, error: string, statusCode: 500 - if there is an internal server error
 */
export async function registerUser(values: unknown): Promise<Res> {
  const { success, output, issues } = v.safeParse(registerSchema, values);
  if (!success) {
    return {
      success: false,
      error: v.flatten(issues),
      statusCode: 400,
    };
  }

  const { name, email, password } = output;

  try {
    const existingUser = await db
      .select({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(lower(users.email), email.toLowerCase()))
      .then((res) => res[0] ?? null);

    if (existingUser?.id) {
      if (!existingUser.emailVerified) {
        const verificationToken = await createVerificationToken(
          existingUser.email
        );

        await userMail("welcome", existingUser.email, process.env.AUTH_URL);
        await userMail(
          "verify",
          existingUser.email,
          `${process.env.AUTH_URL}/en/auth/verify/${verificationToken.token}`
        );

        return {
          success: false,
          error: "User exists but not verified. Verification link resent",
          statusCode: 403,
        };
      } else {
        return {
          success: false,
          error: "Email already exists",
          statusCode: 409,
        };
      }
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }

  try {
    const hashedPassword = await hash(password, 10);
    const adminEmails = await findAdminUserEmailAddresses();
    const isAdmin = adminEmails.includes(email.toLowerCase());

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER,
      })
      .returning({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
      })
      .then((res) => res[0]);

    const verificationToken = await createVerificationToken(newUser.email);
    await userMail(
      "verify",
      newUser.email,
      `${process.env.AUTH_URL}/en/auth/verify/${verificationToken.token}`
    );

    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}
