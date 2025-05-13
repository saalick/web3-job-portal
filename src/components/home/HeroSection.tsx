
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, Code, Globe, Sparkles, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(124, 58, 237, 0.6)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0D0C22] via-[#171347] to-[#0E0D2C] pt-24 pb-20 min-h-[92vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://cdn.pixabay.com/photo/2023/01/22/05/30/network-7735438_1280.jpg')] bg-cover bg-center" />
      
      <div className="absolute top-0 right-0 opacity-30 blur-3xl">
        <div className="w-96 h-96 rounded-full bg-web3-primary" />
      </div>
      
      <div className="absolute bottom-0 left-0 opacity-30 blur-3xl">
        <div className="w-80 h-80 rounded-full bg-web3-secondary" />
      </div>

      <div className="absolute w-full h-full bg-gradient-radial from-transparent to-black/50 pointer-events-none" />

      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Hero Content */}
          <motion.div variants={childVariants} className="flex flex-col items-center justify-center text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-8 rounded-full border border-web3-secondary/30 bg-web3-secondary/10 text-web3-secondary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">The Next Generation Web3 Job Platform</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70 tracking-tight leading-tight mb-6">
              Your Gateway to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-web3-primary via-web3-secondary to-web3-accent animate-gradient-rotate">
                Web3 Revolution
              </span>
            </h1>

            <motion.p 
              variants={childVariants}
              className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10"
            >
              Connect with top blockchain companies and startups. Find your dream role in DeFi, NFTs, 
              DAOs, and more across the decentralized ecosystem.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            variants={childVariants}
            className="relative max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/10 backdrop-blur-xl p-2 md:p-3 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search roles, skills, or companies..."
                    className="pl-12 h-14 w-full bg-white/5 border-white/10 text-white placeholder:text-white/50 hover:border-web3-primary/50 focus:border-web3-primary focus-visible:ring-1 focus-visible:ring-web3-primary rounded-xl"
                  />
                </div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button className="h-14 px-8 md:w-auto w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 rounded-xl text-white font-medium text-lg shadow-[0_4px_16px_rgba(124,58,237,0.4)] transition-all duration-300">
                    <Search className="mr-2 h-5 w-5" />
                    Find Jobs
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Filter Tags */}
          <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-3 mb-16">
            {["Smart Contract", "NFTs", "DeFi", "Web3", "Blockchain", "DAOs"].map((tag, i) => (
              <motion.div 
                key={tag} 
                variants={buttonVariants}
                whileHover="hover" 
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.5 + (i * 0.1) } 
                }}
              >
                <Button variant="outline" className="text-sm border border-white/20 bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-full px-5">
                  {tag}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={childVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: "2,400+", label: "Active Jobs" },
              { value: "850+", label: "Companies" },
              { value: "25k+", label: "Web3 Talents" },
              { value: "98%", label: "Success Rate" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={floatVariants}
                animate="animate"
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-web3-primary to-web3-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            variants={childVariants}
            className="mt-16 text-center"
          >
            <Link to="/jobs">
              <motion.button 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md font-medium"
              >
                <span>Explore All Jobs</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Visual Indicators */}
          <motion.div 
            variants={childVariants}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/50 text-xs flex items-center gap-2"
            >
              <Zap className="h-3 w-3" />
              <span>Scroll to Explore</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
