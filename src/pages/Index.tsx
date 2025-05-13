
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedJobsSection from "@/components/jobs/FeaturedJobsSection";
import CategorySection from "@/components/home/CategorySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedJobsSection />
        <CategorySection />
        <HowItWorksSection />
        <CompaniesSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
