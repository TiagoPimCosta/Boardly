import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-linear-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-(image:--gradient-hero) opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your
            <br />
            Freelance Workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of freelancers who manage their projects more efficiently with Boardly.
            Start your free 14-day trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="min-w-[200px]">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] bg-background/50 backdrop-blur-sm"
            >
              Schedule a Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
