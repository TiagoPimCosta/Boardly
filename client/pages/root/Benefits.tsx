import { Eye, Shield, Layers, Zap, Users, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Layers,
    title: "Unified Workspace",
    description:
      "Manage all your client projects in one clean, organized Kanban board. No more switching between multiple tools.",
  },
  {
    icon: Eye,
    title: "Smart Transparency",
    description:
      "Clients see their tasks clearly while other projects appear blurred. Show you're active without revealing sensitive details.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Protect confidential client information while maintaining professional transparency. Your privacy, their trust.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Clients get instant visibility into task progress. No more status update meetings or repetitive emails.",
  },
  {
    icon: Users,
    title: "Multi-Client Support",
    description:
      "Work with unlimited clients simultaneously. Each gets their own secure view of their project status.",
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description:
      "Enterprise-grade security with role-based access control. Your data is encrypted and protected.",
  },
];

export const Benefits = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for Modern Freelancers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage multiple clients professionally while protecting your
            privacy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
