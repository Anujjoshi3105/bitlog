import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import type { PricingPlan, Plan } from "@/types/pricing";

interface PricingCardProps {
  plan: PricingPlan;
  selectedPlan: Plan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, selectedPlan }) => {
  const getDisplayedPrice = (plan: PricingPlan, selectedPlan: Plan) => {
    if (selectedPlan === "monthly") {
      return plan.monthlyPrice;
    } else {
      return Math.round((plan.yearlyPrice * 0.8) / 12);
    }
  };

  return (
    <Card
      className={cn(
        plan.popular &&
          "drop-shadow-xl dark:bg-primary/20 border-[1.5px] border-primary lg:scale-[1.05]",
        "flex flex-col h-full"
      )}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
        <CardDescription className="py-2">{plan.description}</CardDescription>
        <div className="flex items-end justify-center gap-2">
          <span className="text-3xl font-bold">
            $
            <NumberTicker value={getDisplayedPrice(plan, selectedPlan)} />
          </span>
          / monthly
          <AnimatePresence>
            {plan.id !== "basic" && selectedPlan === "yearly" && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block text-xs px-2 py-0.5 rounded bg-primary text-background font-medium">
                Save 20%
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-4 text-sm">
          {plan.features.map(({ feature, available }) => (
            <li key={feature} className="flex items-center">
              {available ? (
                <Check className="bg-green-600 rounded-full p-1 text-background mr-4 flex-shrink-0" />
              ) : (
                <X className="bg-red-600 rounded-full p-1 text-background mr-2 flex-shrink-0" />
              )}
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={plan.popular ? "default" : "outline"}>
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
