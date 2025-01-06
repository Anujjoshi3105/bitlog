"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import plans from "@/data/pricing.json";

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

export default function Prices() {
  return (
    <section className="py-24">
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}>
        {plans.map(
          ({
            popular,
            title,
            price,
            description,
            btn,
            features,
          }: {
            popular: boolean;
            title: string;
            price: number;
            description: string;
            btn: string;
            features: { feature: string; available: boolean }[];
          }) => (
            <motion.div key={title} variants={cardVariants}>
              <Card
                className={
                  popular
                    ? "drop-shadow-xl border-[1.5px] border-primary lg:scale-[1.1]"
                    : ""
                }>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                  <CardDescription className="pb-4">
                    {description}
                  </CardDescription>
                  <div>
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-muted-foreground"> /month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-sm">
                    {features.map(({ feature, available }) => (
                      <li key={feature} className="flex items-center">
                        {available ? (
                          <Check className="bg-green-200 rounded-full p-1 text-green-600 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="bg-red-200 rounded-full p-1 text-red-600 mr-2 flex-shrink-0" />
                        )}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={popular ? "default" : "secondary"}>
                    {btn}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
}
