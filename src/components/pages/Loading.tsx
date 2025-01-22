"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % 100);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-background">
        <div className="space-y-2 my-16 text-center">
          <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-extrabold">
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-primary text-background p-2 rounded-sm">
              BIT
            </motion.span>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}>
              LOG
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl font-bold">
            {t("Slogan")}
          </motion.div>
        </div>
        <div className="max-w-2xl space-y-1 text-center italic px-4 text-balance">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-sm sm:text-base">
              {t(`Quotes.${currentQuoteIndex + 1}.quote`)}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuoteIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-xs sm:text-sm text-right">
              ~ {t(`Quotes.${currentQuoteIndex + 1}.author`)}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
