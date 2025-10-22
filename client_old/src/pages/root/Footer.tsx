export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Boardly logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Boardly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              One board. Clear progress. Blurred boundaries.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Boardly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
