import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    content:
      "Boardly transformed how I work with clients. They love seeing their progress in real-time, and I love the privacy features that keep my other projects confidential.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Independent Developer",
    content:
      "Finally, a project management tool that gets freelancing. One board for everything, clear visibility for clients, and my workflow stays private. Brilliant!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Consultant",
    content:
      "My clients are happier because they can check progress anytime. I'm happier because I'm not answering 'how's it going?' emails all day. Win-win!",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Freelancers Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of freelancers who trust Boardly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
