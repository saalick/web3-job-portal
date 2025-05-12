
import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-web3-primary rounded-lg p-1.5">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
            Web3Jobs
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search jobs..." 
              className="pl-8"
            />
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-web3-primary transition-colors">
              Jobs
            </Link>
            <Link to="/companies" className="text-gray-600 hover:text-web3-primary transition-colors">
              Companies
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-web3-primary transition-colors">
              Resources
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/post-job">
            <Button className="bg-web3-primary hover:bg-web3-dark text-white">
              Post a Job
            </Button>
          </Link>
          <Link to="/login" className="hidden md:block">
            <Button variant="outline" className="border-web3-primary text-web3-primary hover:bg-web3-primary/10">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
