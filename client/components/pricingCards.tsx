import { PricingPlan } from "@/services/stripe/queries";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface PricingCardsProps {
  plans: Record<string, PricingPlan[]>;
}
export default function PricingCards(props: PricingCardsProps) {
  const { plans } = props;

  return (
    <Tabs
      defaultValue={Object.keys(plans)[0]}
      className="flex items-center gap-10"
    >
      <TabsList>
        {Object.keys(plans).map((key) => (
          <TabsTrigger key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.keys(plans).map((key) => (
        <TabsContent key={key} value={key}>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {plans[key].length === 0 ? (
              <div>No plans available.</div>
            ) : (
              plans[key].map((plan: PricingPlan, index: number) => {
                const formatted = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: plan.prices.currency.toUpperCase(),
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(plan.prices.amount / 100);
                return (
                  <Card
                    key={index}
                    className={`relative p-8 min-w-[300px] hover:shadow-xl transition-all duration-300 ${
                      index % 2 !== 0
                        ? "border-primary shadow-lg scale-105 bg-linear-to-b from-card to-primary/5"
                        : "border-border/50 bg-card/50"
                    }`}
                  >
                    {index % 2 !== 0 && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-primary to-primary-glow rounded-full text-xs font-semibold text-primary-foreground flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {plan.description} Description
                      </p>
                      <div className="mb-2">
                        <span className="text-5xl font-bold">{formatted}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>

                    <Button
                      variant={index % 2 !== 0 ? "hero" : "outline"}
                      className="w-full mb-6"
                      asChild
                    >
                      {plan.payment_link && (
                        <a
                          href={plan.payment_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-primary"
                        >
                          Subscribe
                        </a>
                      )}
                    </Button>

                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
