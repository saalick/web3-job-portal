
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg p-1.5">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
                MetaHire
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              The leading job board for Web3, blockchain, and crypto careers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-web3-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse-jobs" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/salary-guide" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link to="/create-profile" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Create Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/talent-search" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Find Talent
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-web3-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MetaHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
