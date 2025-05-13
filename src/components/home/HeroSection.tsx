
import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-24 px-4 bg-gradient-to-br from-web3-primary via-web3-secondary to-web3-accent overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Find Your Dream <span className="text-white/90">Web3</span> Career
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover the best blockchain, crypto, and Web3 jobs from leading companies in the space
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-xl p-4 md:p-2 shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row gap-3 backdrop-blur-sm">
            <div className="relative flex-grow md:ml-2">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search jobs, skills, or companies..."
                className="pl-10 h-12 w-full border-transparent focus:border-web3-primary focus:ring-web3-primary/30 rounded-lg"
              />
            </div>
            <Button className="bg-web3-primary hover:bg-web3-dark text-white h-12 px-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              Search Jobs
            </Button>
          </div>
          
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-20 w-40 h-40 bg-web3-accent/10 rounded-full blur-3xl"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm rounded-lg shadow-sm">
            <Briefcase className="mr-2 h-4 w-4" />
            Freelance
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm rounded-lg shadow-sm">
            <Code className="mr-2 h-4 w-4" />
            Developer
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm rounded-lg shadow-sm">
            <Globe className="mr-2 h-4 w-4" />
            Remote
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-white text-3xl font-bold">1,200+</div>
            <div className="text-white/80 text-sm">Active Jobs</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-white text-3xl font-bold">500+</div>
            <div className="text-white/80 text-sm">Companies</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-white text-3xl font-bold">10k+</div>
            <div className="text-white/80 text-sm">Web3 Talents</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-white text-3xl font-bold">95%</div>
            <div className="text-white/80 text-sm">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
