export type Plan = "monthly" | "yearly";

export interface PlanFeature {
  feature: string;
  available: boolean;
}

export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular: boolean;
  buttonText: string;
  features: PlanFeature[];
}
