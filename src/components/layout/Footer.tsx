
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Github, Twitter, Linkedin, Zap, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeInUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <footer className="bg-[#0D0C22] border-t border-white/10 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-8 pb-16">
          {/* Logo and Description */}
          <motion.div 
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg p-1.5 relative z-10">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl opacity-50"></div>
              </div>
              <span className="text-2xl font-bold font-display bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                MetaHire
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              The premier job platform connecting talented professionals with innovative opportunities in the Web3, blockchain, and crypto ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/40 hover:text-web3-primary transition-colors duration-300 hover:scale-110 transform">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-web3-primary transition-colors duration-300 hover:scale-110 transform">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-web3-primary transition-colors duration-300 hover:scale-110 transform">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Navigation Links - Job Seekers */}
          <motion.div
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display font-bold text-white mb-6">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse-jobs" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/salary-guide" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link to="/create-profile" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Create Profile
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Navigation Links - Employers */}
          <motion.div
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display font-bold text-white mb-6">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/post-job" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/talent-search" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Find Talent
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Navigation Links - Company */}
          <motion.div
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-web3-primary text-sm transition-colors duration-300 flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display font-bold text-white mb-6">Stay Updated</h3>
            <p className="text-white/60 text-sm mb-4">
              Get the latest Web3 jobs delivered to your inbox
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-10 w-full bg-white/5 border-white/10 text-white placeholder:text-white/50 hover:border-web3-primary/50 focus:border-web3-primary focus-visible:ring-1 focus-visible:ring-web3-primary rounded-lg"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 text-white">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-8 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} MetaHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
