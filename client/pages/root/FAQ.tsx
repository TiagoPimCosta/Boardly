import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the privacy feature work?",
    answer:
      "When you invite a client, they get access to view only their project's cards. Other clients' cards appear blurred or abstracted, showing activity without revealing sensitive details. This gives transparency to your clients while protecting confidential information.",
  },
  {
    question: "Can clients edit or move tasks?",
    answer:
      "No, clients have read-only access to the board. They can view their project's progress and task details, but only you (the freelancer) can create, edit, move, or delete tasks. This ensures you maintain full control of your workflow.",
  },
  {
    question: "How many clients can I work with?",
    answer:
      "On the Starter plan, you can invite up to 5 clients. The Pro and Enterprise plans support unlimited client invitations, perfect for growing freelancers and agencies.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes! Boardly is available on iOS and Android. You and your clients can check project progress on the go, with the same privacy features as the web version.",
  },
  {
    question: "What happens after my free trial?",
    answer:
      "Your 14-day free trial includes full access to all features. After the trial, you can choose a paid plan or downgrade to our free tier (coming soon), which includes basic features for up to 1 project.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely! There are no long-term contracts. You can cancel your subscription at any time, and you'll retain access until the end of your billing period.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Boardly
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
