import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-scroll";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="top"
            smooth={true}
            duration={500}
            offset={-64}
            className="flex items-center gap-2 cursor-pointer"
            isDynamic={true}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src="/logo.png" alt="Boardly logo" className="w-10 h-10" />
            <span className="text-xl font-bold">Boardly</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="features"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer  text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="how-it-works"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </Link>
            <Link
              to="pricing"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="faq"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={open ? "true" : "false"}
              onClick={() => setOpen((prev: boolean) => !prev)}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {open && (
            <div
              id="mobile-menu"
              className="absolute top-16 left-0 w-full bg-background border-b border-border/40 shadow-md z-50 flex flex-col items-center gap-6 py-6 md:hidden animate-in fade-in"
            >
              <Link
                to="features"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Features
              </Link>
              <Link
                to="how-it-works"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                How it works
              </Link>
              <Link
                to="pricing"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="faq"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col w-full px-4 gap-2">
                <Button variant="default" className="w-full">
                  Log In
                </Button>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button variant="default">Log In</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
