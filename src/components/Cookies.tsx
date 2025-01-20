"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setConsent, getConsent } from "@/app/action";

const bannerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConsent = async () => {
      const consent = await getConsent();
      setIsVisible(consent === undefined);
    };

    checkConsent();
  }, []);

  const handleConsent = async (consent: boolean) => {
    await setConsent(consent);
    setIsVisible(false);
  };

  if (isVisible === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              We use cookies to enhance your experience, analyze our traffic,
              and for security and marketing. Choose &quot;Accept All&quot; to
              allow all cookies or &quot;Necessary Only&quot; for essential
              cookies only.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="bg-background hover:bg-accent"
                onClick={() => handleConsent(false)}>
                Necessary Only
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={() => handleConsent(true)}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
