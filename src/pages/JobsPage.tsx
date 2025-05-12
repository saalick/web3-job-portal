
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { JobType, JobCategory, ExperienceLevel } from "@/data/jobTypes";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  salary_range: string | null;
  description: string;
  type: JobType;
  category: JobCategory;
  experience: ExperienceLevel;
  skills: string[];
  application_link: string | null;
  contact_email: string | null;
  created_at: string;
  expires_at: string;
  published: boolean;
  verification_status: string;
}

const JobsPage = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("published", true)
          .eq("verification_status", "approved") // Only show approved jobs
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setJobs(data as Job[] || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load job listings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters when they change or when jobs change
  useEffect(() => {
    let results = [...jobs];
    
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
  }, [filters, jobs]);

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
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-web3-primary" />
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={{
                  id: job.id,
                  title: job.title,
                  company: job.company,
                  companyLogo: job.company_logo || '',
                  location: job.location,
                  salary: job.salary_range || 'Not specified',
                  description: job.description,
                  type: job.type,
                  category: job.category,
                  experience: job.experience,
                  skills: job.skills,
                  postedAt: job.created_at,
                  featured: false
                }} 
              />
            ))}
          </div>
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
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
