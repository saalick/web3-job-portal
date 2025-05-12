
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { JobType, JobCategory, ExperienceLevel } from "@/data/jobTypes";

interface Job {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  salary_range: string | null;
  description: string;
  type: string;
  category: string;
  experience: string;
  skills: string[];
  created_at: string;
  verification_status: string;
}

const FeaturedJobsSection = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("published", true)
          .eq("verification_status", "approved") // Only show approved jobs
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          throw error;
        }

        setFeaturedJobs(data || []);
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Jobs</h2>
          <Link to="/jobs">
            <Button variant="ghost" className="text-web3-primary hover:text-web3-dark hover:bg-web3-primary/10">
              View all jobs
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-web3-primary" />
          </div>
        ) : featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {featuredJobs.map(job => (
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
                  type: job.type as JobType,
                  category: job.category as JobCategory,
                  experience: job.experience as ExperienceLevel,
                  skills: job.skills,
                  postedAt: job.created_at,
                  featured: true
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">
              No job listings available yet
            </p>
            <Link to="/post-job">
              <Button className="bg-web3-primary hover:bg-web3-dark text-white">
                Post a Job
              </Button>
            </Link>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/jobs">
            <Button className="bg-web3-primary hover:bg-web3-dark text-white px-8">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
