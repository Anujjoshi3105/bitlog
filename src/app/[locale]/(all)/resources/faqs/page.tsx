"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import Heading from "@/components/ui/heading";

const animationVariants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
};

export default function FAQ() {
  const t = useTranslations("FAQ");

  return (
    <main className="max-w-5xl mx-auto">
      <Heading title={t("title")} description={t("subtitle")} />
      <Accordion type="single" collapsible className="w-full">
        {Array.from({ length: 10 }, (_, index) => {
          const id = index + 1;
          const question = t(`${id}.question`);
          const answer = t(`${id}.answer`);
          const direction = index % 2 === 0 ? "left" : "right";
          return (
            <AccordionItem key={id} value={`item-${id}`}>
              <motion.div
                custom={direction}
                initial="hidden"
                animate="visible"
                variants={animationVariants}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </motion.div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}
