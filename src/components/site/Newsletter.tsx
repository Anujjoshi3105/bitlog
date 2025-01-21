"use client";

import { adminMail, userMail } from "@/lib/nodemailer";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "sonner";

export default function Newsletter() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await userMail("subscribe", email);
      await adminMail(email);
      toast.success("Subscribed successfully.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setEmail("");
      setLoading(false);
    }
  };
  return (
    <div>
      <h4 className="text-lg font-bold uppercase">{t("title")}</h4>
      <p className="max-w-xs mx-auto md:mx-0 mb-4 mt-1">{t("description")}</p>
      <form className="flex items-stretch justify-center">
        <input
          type="email"
          placeholder={t("placeholder")}
          className="flex-1 p-3 bg-accent max-w-sm border-[2px] border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          onClick={sendEmail}
          disabled={loading}
          className="p-4 bg-primary text-background active:scale-95">
          {loading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <AiOutlineSend />
          )}
        </button>
      </form>
    </div>
  );
}
