import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Check, Sparkles } from "lucide-react";

interface PricingCardProps {
  name: string;
  description?: string;
  amount: string;
  payment_link?: string;
  features: string[];
  isActive?: boolean;
}

const PricingCard = (props: PricingCardProps) => {
  const {
    name,
    description,
    amount,
    payment_link,
    features,
    isActive = false,
  } = props;

  return (
    <Card
      className={`relative p-8 min-w-[300px] hover:shadow-xl transition-all duration-300 ${
        isActive
          ? "border-primary shadow-lg scale-105 bg-linear-to-b from-card to-primary/5"
          : "border-border/50 bg-card/50"
      }`}
    >
      {isActive && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-primary to-primary-glow rounded-full text-xs font-semibold text-primary-foreground flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="mb-2">
          <span className="text-5xl font-bold">{amount}</span>
          <span className="text-muted-foreground">/ month</span>
        </div>
      </div>

      <Button
        variant={isActive ? "hero" : "outline"}
        className="w-full mb-6"
        asChild
      >
        {payment_link && (
          <a
            href={payment_link}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-primary"
          >
            Subscribe
          </a>
        )}
      </Button>

      <div className="space-y-3">
        {features.map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PricingCard;
