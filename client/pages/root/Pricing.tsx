import PricingCards from "@/components/pricingCards";

const plans = {
  month: [
    {
      id: "prod_TVnXiVkOSPfyPP",
      name: "Starter",
      active: true,
      prices: {
        currency: "eur",
        amount: 1900,
      },
      payment_link: "https://google.com",
      features: ["feature_1", "feature_2", "feature_3"],
    },
    {
      id: "prod_TVoNfskzEvI9SH",
      name: "Pro",
      active: true,
      prices: {
        currency: "eur",
        amount: 4900,
      },
      payment_link: "https://google.com",
      features: ["feature_4", "feature_5", "feature_6"],
    },
    {
      id: "prod_TVoNvtUNvmygGf",
      name: "Enterprise",
      active: true,
      prices: {
        currency: "eur",
        amount: 9900,
      },
      payment_link: "https://google.com",
      features: ["feature_7", "feature_8", "feature_9"],
    },
  ],
  year: [
    {
      id: "prod_TVnXiVkOSPfyPP",
      name: "Starter",
      active: true,
      prices: {
        currency: "eur",
        amount: 19000,
      },
      payment_link: "https://google.com",
      features: ["feature_10", "feature_11", "feature_12"],
    },
    {
      id: "prod_TVoNfskzEvI9SH",
      name: "Pro",
      active: true,
      prices: {
        currency: "eur",
        amount: 47000,
      },
      payment_link: "https://google.com",
      features: ["feature_13", "feature_14", "feature_15"],
    },
    {
      id: "prod_TVoNvtUNvmygGf",
      name: "Enterprise",
      active: true,
      prices: {
        currency: "eur",
        amount: 95000,
      },
      payment_link: "https://google.com",
      features: ["feature_16", "feature_17", "feature_18"],
    },
  ],
};

export const Pricing = () => {
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

        <PricingCards plans={plans} />
      </div>
    </section>
  );
};
