import { Benefits } from "@/pages/root/Benefits";
import { CTA } from "@/pages/root/CTA";
import { FAQ } from "@/pages/root/FAQ";
import { Footer } from "@/pages/root/Footer";
import { Hero } from "@/pages/root/Hero";
import { HowItWorks } from "@/pages/root/HowItWorks";
import { Navbar } from "@/pages/root/Navbar";
import { Pricing } from "@/pages/root/Pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/*<Partners />*/}
      <Benefits />
      <HowItWorks />
      <Pricing />
      {/* <Testimonials /> */}
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
