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
import { alternateSlideVariants } from "@/data/animate";

export default function FAQ() {
  const t = useTranslations("FAQ");

  return (
    <main className="max-w-5xl mx-auto">
      <Heading title={t("title")} description={t("description")} />
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
                variants={alternateSlideVariants}>
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
