import { UserPlus, FolderKanban, Eye } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Projects",
    description:
      "Set up projects for each client with custom colors and tags. Organize your entire workload in one place.",
    number: "01",
  },
  {
    icon: FolderKanban,
    title: "Manage in One Board",
    description:
      "Add tasks to your unified Kanban board. Drag and drop cards between To Do, In Progress, and Done columns.",
    number: "02",
  },
  {
    icon: Eye,
    title: "Share Smart Access",
    description:
      "Invite clients to view their project. They see their tasks clearly while others appear blurred for privacy.",
    number: "03",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple to Start, Powerful to Use</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get up and running in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-primary/50 to-transparent" />
                )}

                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 to-accent/20 blur-xl" />
                  <div className="relative w-full h-full rounded-full bg-linear-to-br from-primary to-primary-glow flex items-center justify-center">
                    <Icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
