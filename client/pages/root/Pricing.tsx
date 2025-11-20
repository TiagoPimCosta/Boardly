"use client";

import PricingCards from "@/components/pricingCards";
import { useGetPricingPlans } from "@/services/stripe/queries";

export const Pricing = () => {
  const { data } = useGetPricingPlans();

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>

        <PricingCards plans={data} />
      </div>
    </section>
  );
};
