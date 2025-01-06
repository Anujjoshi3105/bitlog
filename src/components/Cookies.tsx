"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const bannerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function CookieBanner() {
  const t = useTranslations("Cookies.Banner");
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledThreshold, setHasScrolledThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollPosition >= viewportHeight && !hasScrolledThreshold) {
        setHasScrolledThreshold(true);
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolledThreshold]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-primary md:px-8 lg:px-12 p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}>
          <Markdown className="text-sm p-2 text-background md:text-left text-balance text-center">
            {t("description")}
          </Markdown>
          <div className="flex items-center gap-2 md:px-12">
            <Button
              variant="outline"
              aria-label="Accept all cookies"
              onClick={handleDismiss}>
              {t("btn1")}
            </Button>
            <Button
              className="border-background border-[1px]"
              aria-label="Accept only necessary cookies"
              onClick={handleDismiss}>
              {t("btn2")}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
