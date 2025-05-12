
import React from "react";
import JobCard from "./JobCard";
import { mockJobs } from "@/data/mockJobs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedJobsSection = () => {
  const featuredJobs = mockJobs.filter(job => job.featured).slice(0, 3);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
          <Link to="/jobs">
            <Button variant="ghost" className="text-web3-primary hover:text-web3-dark hover:bg-web3-primary/10">
              View all jobs
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/jobs">
            <Button className="bg-web3-primary hover:bg-web3-dark text-white">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
