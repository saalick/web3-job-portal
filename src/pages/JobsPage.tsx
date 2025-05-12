
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { mockJobs, Job } from "@/data/mockJobs";
import { JobType, JobCategory, ExperienceLevel } from "@/data/jobTypes";

const JobsPage = () => {
  const location = useLocation();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState({
    search: "",
    jobTypes: [] as JobType[],
    categories: [] as JobCategory[],
    experienceLevels: [] as ExperienceLevel[],
  });

  // Parse URL query params on initial load
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam as JobCategory]
      }));
    }
  }, [location.search]);

  // Apply filters when they change
  useEffect(() => {
    let results = [...mockJobs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply job type filter
    if (filters.jobTypes.length > 0) {
      results = results.filter(job => filters.jobTypes.includes(job.type));
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      results = results.filter(job => filters.categories.includes(job.category));
    }
    
    // Apply experience level filter
    if (filters.experienceLevels.length > 0) {
      results = results.filter(job => filters.experienceLevels.includes(job.experience));
    }
    
    setFilteredJobs(results);
  }, [filters]);

  const handleFilterChange = (newFilters: {
    search: string;
    jobTypes: JobType[];
    categories: JobCategory[];
    experienceLevels: ExperienceLevel[];
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Web3 Jobs</h1>
          <p className="text-gray-600">
            Discover {filteredJobs.length} opportunities in blockchain and cryptocurrency
          </p>
        </div>
        
        <JobFilters onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search filters or check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
