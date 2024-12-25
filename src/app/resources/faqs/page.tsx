"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "@/data/faqs.json";

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
  return (
    <main className="max-w-5xl overflow-clip space-y-16">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h1>
        <h3 className="text-muted-foreground">
          Explore Commonly Asked Questions
        </h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map(({ question, answer }, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          return (
            <AccordionItem key={index} value={`item-${index}`}>
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
