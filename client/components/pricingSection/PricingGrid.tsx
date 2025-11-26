import {
  GetStripeProductsResponse,
  PricingPlan,
} from "@/services/stripe/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";
import PricingCard from "./PricingCard";

interface PricingCardsProps {
  plans?: GetStripeProductsResponse;
}

export default function PricingGrid(props: PricingCardsProps) {
  const { plans } = props;

  // TODO: Create a skeleton for the pricing cards
  if (!plans) return <Skeleton className="h-12 w-12 rounded-full" />;

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
                const formattedAmount = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: plan.prices.currency.toUpperCase(),
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(plan.prices.amount / 100);
                const active = index % 2 !== 0;

                return (
                  <PricingCard
                    key={index}
                    name={plan.name}
                    description={plan.description ?? undefined}
                    amount={formattedAmount}
                    payment_link={plan.payment_link ?? undefined}
                    features={plan.features}
                    isActive={active}
                  />
                );
              })
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
