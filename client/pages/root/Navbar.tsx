"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <ScrollLink
            to="top"
            smooth={true}
            duration={500}
            offset={-64}
            className="flex items-center gap-2 cursor-pointer"
            isDynamic={true}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/logo.png"
              alt="Boardly logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">Boardly</span>
          </ScrollLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <ScrollLink
              to="features"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer  text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              offset={-64}
              duration={500}
              className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </ScrollLink>
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
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
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
              <ScrollLink
                to="features"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="how-it-works"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                How it works
              </ScrollLink>
              <ScrollLink
                to="pricing"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Pricing
              </ScrollLink>
              <ScrollLink
                to="faq"
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                FAQ
              </ScrollLink>
              <div className="flex flex-col w-full px-4 gap-2">
                <Button variant="default" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </div>
          )}

          <div className="hidden md:flex">
            <Button variant="default" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
