
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CallToAction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
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

  const features = [
    "Access to exclusive Web3 opportunities",
    "Connect with industry-leading companies",
    "Personalized job recommendations",
    "Fast application process"
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0C22] via-[#171347] to-[#0E0D2C]"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-web3-primary opacity-20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-web3-accent opacity-20 blur-[100px] rounded-full"></div>
      
      <div className="container relative z-10 mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 rounded-full border border-web3-secondary/30 bg-white/5 backdrop-blur-sm text-web3-secondary">
              <span className="text-xs font-medium">Ready to launch your Web3 career?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70 mb-6 leading-tight">
              Join the Decentralized <br />
              Job Revolution
            </h2>
            
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              Whether you're a developer, designer, marketer, or business professional, there's a place for you in the Web3 ecosystem. Create your profile today.
            </p>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.6 + (index * 0.1) } 
                  }}
                >
                  <CheckCircle className="h-5 w-5 text-web3-accent mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/jobs">
                  <Button className="h-12 px-8 bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 text-white font-medium text-lg shadow-[0_4px_16px_rgba(124,58,237,0.4)] w-full sm:w-auto">
                    Find Jobs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/post-job">
                  <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 font-medium text-lg w-full sm:w-auto">
                    Post a Job
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Content - Decorative Element */}
          <motion.div 
            variants={itemVariants} 
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative circle elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border-2 border-dashed border-white/20 rounded-full animate-spin" style={{animationDuration: '30s'}}></div>
              </div>
              
              <div className="absolute inset-[10%] flex items-center justify-center">
                <div className="w-full h-full border border-white/30 rounded-full animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
              </div>
              
              <div className="absolute inset-[25%] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-r from-web3-primary/20 to-web3-secondary/20 rounded-full animate-pulse-glow"></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central icon */}
                <motion.div 
                  className="bg-gradient-to-r from-web3-primary to-web3-secondary p-8 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16L16 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
              
              {/* Floating dots */}
              {[...Array(6)].map((_, i) => {
                const angle = (Math.PI * 2 * i) / 6;
                const x = Math.cos(angle) * 45 + 50;
                const y = Math.sin(angle) * 45 + 50;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-web3-accent rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
