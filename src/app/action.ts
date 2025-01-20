"use server";

import { cookies } from "next/headers";

export async function setConsent(consent: boolean) {
  (await cookies()).set("consent", consent.toString(), {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export async function getConsent(): Promise<boolean | undefined> {
  const consentCookie = (await cookies()).get("consent");
  return consentCookie ? consentCookie.value === "true" : undefined;
}

export async function setRegion(region: string) {
  (await cookies()).set("region", region, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
