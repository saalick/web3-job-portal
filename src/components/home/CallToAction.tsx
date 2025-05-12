
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-web3-primary to-web3-secondary">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Web3 Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Whether you're a developer, designer, marketer, or business professional, there's a place for you in the blockchain revolution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button className="bg-white text-web3-primary hover:bg-gray-100 py-6 px-8 text-lg font-medium w-full sm:w-auto">
                Find Jobs
              </Button>
            </Link>
            <Link to="/post-job">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 py-6 px-8 text-lg font-medium w-full sm:w-auto">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
