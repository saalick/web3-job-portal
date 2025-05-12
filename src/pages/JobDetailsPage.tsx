
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Briefcase, Building, Calendar, DollarSign, Globe, Users, User, Loader2, ExternalLink } from "lucide-react";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "@/data/jobTypes";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  application_link: string | null;
  contact_email: string | null;
  created_at: string;
  expires_at: string;
  published: boolean;
}

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        
        if (!id) return;

        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .eq("published", true)
          .single();

        if (error) {
          throw error;
        }

        setJob(data as Job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-web3-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">
              The job listing you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs">
              <Button className="bg-web3-primary hover:bg-web3-dark text-white">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Top section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
              <img 
                src={job.company_logo || 'https://placeholder.svg'} 
                alt={`${job.company} logo`} 
                className="w-full h-full object-contain p-1" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placeholder.svg';
                }}
              />
            </div>
            
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Posted on {formatDate(job.created_at)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-web3-primary/10 text-web3-primary border-none">
                  {JOB_TYPES[job.type as keyof typeof JOB_TYPES]}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {job.category.replace(/-/g, ' ')}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {EXPERIENCE_LEVELS[job.experience as keyof typeof EXPERIENCE_LEVELS]}
                </Badge>
              </div>
            </div>
            
            <div className="md:text-right">
              <div className="text-xl font-semibold text-gray-900 mb-4">
                {job.salary_range || 'Salary not specified'}
              </div>
              {job.application_link ? (
                <Button 
                  className="bg-web3-primary hover:bg-web3-dark text-white w-full md:w-auto"
                  onClick={() => window.open(job.application_link!, '_blank')}
                >
                  Apply Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              ) : job.contact_email ? (
                <Button 
                  className="bg-web3-primary hover:bg-web3-dark text-white w-full md:w-auto"
                  onClick={() => window.location.href = `mailto:${job.contact_email}`}
                >
                  Contact Via Email
                </Button>
              ) : (
                <Button disabled className="w-full md:w-auto">
                  No Application Method Provided
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Job details */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Skills section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50 py-1.5 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side - Company info and apply section */}
          <div className="space-y-6">
            {/* Company info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Company Details
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                  <img 
                    src={job.company_logo || 'https://placeholder.svg'} 
                    alt={`${job.company} logo`} 
                    className="w-full h-full object-contain p-1" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placeholder.svg';
                    }}
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {job.company}
                </h3>
              </div>
            </div>
            
            {/* Job summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Salary</div>
                    <div className="font-medium">{job.salary_range || 'Not specified'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium">{job.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Job Type</div>
                    <div className="font-medium">{JOB_TYPES[job.type as keyof typeof JOB_TYPES]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Experience Level</div>
                    <div className="font-medium">{EXPERIENCE_LEVELS[job.experience as keyof typeof EXPERIENCE_LEVELS]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Posted</div>
                    <div className="font-medium">{formatDate(job.created_at)}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                {job.application_link ? (
                  <Button 
                    className="w-full bg-web3-primary hover:bg-web3-dark text-white"
                    onClick={() => window.open(job.application_link!, '_blank')}
                  >
                    Apply for this job
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                ) : job.contact_email ? (
                  <Button 
                    className="w-full bg-web3-primary hover:bg-web3-dark text-white"
                    onClick={() => window.location.href = `mailto:${job.contact_email}`}
                  >
                    Contact Via Email
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    No Application Method Provided
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
