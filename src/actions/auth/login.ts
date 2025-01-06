"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 403 | 409 | 500 };

/**
 * Handles login request
 * @param values - Form values
 * @returns
 * - success: true - if the user is successfully logged in
 * - success: false, error: string, statusCode: 401 - if the credentials are invalid
 * - success: false, error: string, statusCode: 403 - if the user is not verified
 * - success: false, error: string, statusCode: 409 - if the user is linked to an OAuth provider
 * - success: false, error: string, statusCode: 500 - if there is an internal server error
 */
export async function loginUser(values: unknown): Promise<Res> {
  try {
    if (
      typeof values !== "object" ||
      values === null ||
      Array.isArray(values)
    ) {
      throw new Error("Invalid JSON Object");
    }

    await signIn("credentials", { ...values, redirect: false });

    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials provided. Please try again.",
            statusCode: 401,
          };
        case "AccessDenied":
          return {
            success: false,
            error: "Access denied. Please verify your email or sign up again.",
            statusCode: 403,
          };
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error:
              "This account is linked to an OAuth provider. Please log in with Google or GitHub.",
            statusCode: 409,
          };
        default:
          return {
            success: false,
            error: "An unexpected error occurred. Please try again later.",
            statusCode: 500,
          };
      }
    }

    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
