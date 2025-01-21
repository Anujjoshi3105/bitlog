"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Heading from "@/components/ui/heading";
import { useTranslations } from "next-intl";
import PLANS from "@/data/pricing.json";
import type { Plan } from "@/types/pricing";
import PricingCard from "./pricing-card";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Pricing() {
  const t = useTranslations("PriceCard");
  const [selectedPlan, setSelectedPlan] = useState<Plan>("monthly");

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Heading
          title={t("title")}
          subtitle={t("subtitle")}
          description={t("description")}
        />
        <Tabs
          defaultValue="monthly"
          className="w-full flex flex-col items-center justify-center mb-12"
          onValueChange={(value) => setSelectedPlan(value as Plan)}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}>
          {PLANS.map((plan) => (
            <motion.div key={plan.id} variants={cardVariants}>
              <PricingCard plan={plan} selectedPlan={selectedPlan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
