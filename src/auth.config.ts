import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";
import Discord from "next-auth/providers/discord";
import Passkey from "next-auth/providers/passkey";
import db from "./drizzle";
import * as schema from "./drizzle/schema";
import { oauthVerifyEmail } from "./actions/auth/auth";
import { USER_ROLES } from "./lib/constants";
import type { AdapterUser } from "@auth/core/adapters";
import { getTableColumns } from "drizzle-orm";
import { findAdminUserEmailAddresses } from "./actions/auth/queries";
import { Locale, routing } from "@/i18n/routing";

interface RouteConfig {
  readonly auth: readonly string[];
  readonly protected: readonly string[];
}

const ROUTES: RouteConfig = {
  auth: [
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/verify",
    "/auth/error",
  ],
  protected: ["/dashboard"],
} as const;

const utils = {
  parsePath: (pathname: string) => {
    const [, locale, ...rest] = pathname.split("/");
    return {
      locale: locale as Locale,
      path: `/${rest.join("/")}`,
    };
  },

  matchesRoute: (path: string, routes: readonly string[]): boolean =>
    routes.some((route) => path.startsWith(route)),

  createRedirectUrl: (locale: Locale, path: string, baseUrl: string): URL =>
    new URL(`/${locale}${path}`, baseUrl),
};

export const authConfig = {
  adapter: {
    ...DrizzleAdapter(db, {
      accountsTable: schema.accounts,
      usersTable: schema.users,
      authenticatorsTable: schema.authenticators,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    }),
    async createUser(data: AdapterUser) {
      const { id, ...insertData } = data;
      const hasDefaultId = getTableColumns(schema.users)["id"]["hasDefault"];

      const adminEmails = await findAdminUserEmailAddresses();
      const isAdmin = adminEmails.includes(insertData.email.toLowerCase());

      if (isAdmin) {
        insertData.role = isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER;
      }

      return db
        .insert(schema.users)
        .values(hasDefaultId ? insertData : { ...insertData, id })
        .returning()
        .then((res) => res[0]);
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    newUser: "/auth/register",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const { nextUrl } = request;
      const { locale, path } = utils.parsePath(nextUrl.pathname);
      const isLoggedIn = !!auth?.user;

      // Validate locale
      if (!routing.locales.includes(locale)) {
        return Response.redirect(
          new URL(`/${routing.defaultLocale}${path}`, nextUrl.origin)
        );
      }

      // Handle protected routes
      if (utils.matchesRoute(path, ROUTES.protected) && !isLoggedIn) {
        const loginUrl = utils.createRedirectUrl(
          locale,
          "/auth/login",
          nextUrl.origin
        );
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(loginUrl);
      }

      // Handle auth routes
      if (utils.matchesRoute(path, ROUTES.auth) && isLoggedIn) {
        return Response.redirect(
          utils.createRedirectUrl(locale, "/dashboard", nextUrl.origin)
        );
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") return { ...token, ...session.user };
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    signIn({ user, account, profile }) {
      if (account?.provider === "google") return !!profile?.email_verified;
      if (account?.provider === "github") return true;
      if (account?.provider === "credentials") {
        if (user.emailVerified) return true;
      }
      return false;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["google", "github"].includes(account.provider)) {
        if (user.email) await oauthVerifyEmail(user.email);
      }
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Passkey,
  ],
  experimental: {
    enableWebAuthn: true,
  },
} as const satisfies NextAuthConfig;
