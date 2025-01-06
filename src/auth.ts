import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as v from "valibot";
import { findUserByEmail } from "./actions/auth/queries";
import { loginSchema } from "./lib/validators/login";
import { OAuthAccountAlreadyLinkedError } from "./lib/custom-error";
import { authConfig } from "./auth.config";
import { compare } from "bcryptjs";
const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,
  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const { success, output } = v.safeParse(loginSchema, credentials);
        if (success) {
          const { email, password } = output;
          const user = await findUserByEmail(email);
          if (!user) throw new Error("User not found");
          if (!user.password) throw new OAuthAccountAlreadyLinkedError();
          const passwordMatch = await compare(password, user.password);
          if (!passwordMatch) throw new Error("Invalid credentials");
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...rest } = user;
          return rest;
        }
        return null;
      },
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;
