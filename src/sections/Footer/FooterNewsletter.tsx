"use client";

import { Loader } from "lucide-react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        alert("You have been subscribed to our newsletter!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="mt-4 flex items-stretch justify-center">
      <input
        type="email"
        placeholder="Your email address"
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
          <Loader className="animate-spin w-4 h-4" />
        ) : (
          <AiOutlineSend />
        )}
      </button>
    </form>
  );
}
