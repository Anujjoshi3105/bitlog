"use client";

import { FaDiscord, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa6";
//import { GoPasskeyFill } from "react-icons/go";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { oauthLogin } from "@/actions/auth/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/webauthn";

export default function OAuth() {
  const t = useTranslations();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  useEffect(() => {
    if (!error) return;
    if (error === "OAuthAccountNotLinked") {
      setErrorMessage("This account is already in use. Please sign in.");
      toast.error("This account is already in use. Please sign in.");
    } else {
      setErrorMessage("An error occured. Please try again.");
      toast.error("An error occured. Please try again.");
    }
  }, [error]);
  const clickHandler = async (
    provider: "google" | "github" | "discord" | "twitter"
  ) => {
    try {
      await oauthLogin(provider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="my-2 relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("Auth.Continue")}
          </span>
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Button
          className="rounded-full"
          variant="outline"
          size="smIcon"
          onClick={clickHandler.bind(null, "google")}
          aria-label="Google">
          <FaGoogle />
        </Button>
        <Button
          className="rounded-full"
          variant="outline"
          size="smIcon"
          onClick={clickHandler.bind(null, "github")}
          aria-label="GitHub">
          <FaGithub />
        </Button>
        <Button
          className="rounded-full"
          variant="outline"
          size="smIcon"
          onClick={clickHandler.bind(null, "discord")}
          aria-label="Discord">
          <FaDiscord />
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          size="smIcon"
          onClick={() => signIn("twitter")}
          aria-label="Twitter">
          <FaTwitter />
        </Button>
        {/*
        <Button
          variant="outline"
          className="rounded-full"
          size="smIcon"
          onClick={() => signIn("passkey")}
          aria-label="Passkey">
          <GoPasskeyFill />
        </Button>*/}
      </div>
      {errorMessage && (
        <p className="bg-destructive/10 p-2 rounded-sm select-none text-xs text-center font-medium text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
