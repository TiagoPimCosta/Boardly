import { useQuery } from "@tanstack/react-query";

export interface PricingPlan {
  id: string;
  name: string;
  active: boolean;
  description?: string | null;
  prices: {
    currency: string;
    amount: number;
  };
  payment_link: string | null;
  features: string[];
}

export type StripeProducts = Record<string, PricingPlan[]>;

export type GetStripeProductsResponse = StripeProducts;

export function getPricingPlans() {
  const url = "http://localhost:8080/stripe/pricing";
  return fetch(url);
}

export function useGetPricingPlans() {
  return useQuery<GetStripeProductsResponse, Error>({
    queryKey: ["stripe", "stripePricingPlans"],
    queryFn: async () => {
      const response = await getPricingPlans();
      if (!response.ok) throw new Error("Failed to fetch pricing plans");
      return (await response.json()) as GetStripeProductsResponse;
    },
  });
}
