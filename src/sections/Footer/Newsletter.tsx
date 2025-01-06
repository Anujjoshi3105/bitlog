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
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setEmail("");
      setLoading(false);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-bold uppercase mb-3">{t("title")}</h5>
      <p className="max-w-xs mx-auto md:mx-0">{t("description")}</p>

      <form className="mt-4 flex items-stretch justify-center">
        <input
          type="email"
          placeholder={t("placeholder")}
          className="flex-1 p-3 text-primary max-w-sm border-[2px] border-transparent focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          onClick={sendEmail}
          disabled={loading}
          className="p-4 -ml-2 bg-primary text-background flex items-center justify-center active:scale-95 hover:brightness-125">
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <AiOutlineSend />
          )}
        </button>
      </form>
    </div>
  );
}
