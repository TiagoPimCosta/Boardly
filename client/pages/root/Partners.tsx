export const Partners = () => {
  const partners = [
    "Freelance Pro",
    "Design Studio",
    "Dev Agency",
    "Creative Co",
    "Tech Solutions",
    "Digital First",
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-muted/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
          Trusted by freelancers worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
            >
              <span className="text-lg font-semibold text-muted-foreground">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
