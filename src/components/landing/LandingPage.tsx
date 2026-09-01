"use client";

import { useEffect, useState } from "react";

import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { Problem } from "@/components/landing/Problem";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { TrustBar } from "@/components/landing/TrustBar";
import { UseCases } from "@/components/landing/UseCases";
import { WorkflowStrip } from "@/components/landing/WorkflowStrip";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-background)]">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        scrolled={scrolled}
      />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <Features />
        <WorkflowStrip />
        <HowItWorks />
        <UseCases />
        <ProductPreview />
        <PrivacySection />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
