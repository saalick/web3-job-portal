
import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-20 px-4 bg-gradient-to-br from-web3-primary via-web3-secondary to-web3-accent">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
          Find Your Dream Web3 Career
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover the best blockchain, crypto, and Web3 jobs from leading companies in the space
        </p>
        
        <div className="bg-white rounded-lg p-4 shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              className="pl-10 h-12 w-full"
            />
          </div>
          <Button className="bg-web3-primary hover:bg-web3-dark text-white h-12 px-8">
            Search Jobs
          </Button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Briefcase className="mr-2 h-4 w-4" />
            Freelance
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Code className="mr-2 h-4 w-4" />
            Developer
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Globe className="mr-2 h-4 w-4" />
            Remote
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-white text-2xl font-bold">1,200+</div>
            <div className="text-white/80 text-sm">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold">500+</div>
            <div className="text-white/80 text-sm">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold">10k+</div>
            <div className="text-white/80 text-sm">Web3 Talents</div>
          </div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold">95%</div>
            <div className="text-white/80 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
