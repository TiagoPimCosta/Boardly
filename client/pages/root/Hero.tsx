import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import heroBoardImage from "@/public/hero-board.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-(image:--gradient-hero)" />

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              One Board. Clear Progress. Blurred Boundaries.
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
            Transparency for clients
            <br />
            Privacy for freelancers
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Manage all your projects in a single unified Kanban board. Give clients transparent
            access to their tasks while keeping other projects private.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="lg" className="min-w-[200px]">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Watch Demo
            </Button>
          </div>

          {/* Product Screenshot */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-accent/20 blur-3xl opacity-50" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur-sm">
              <Image
                src={heroBoardImage}
                alt="Boardly unified Kanban board interface showing multiple projects with privacy features"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
