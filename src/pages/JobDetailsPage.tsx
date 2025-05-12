
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockJobs } from "@/data/mockJobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Briefcase, Building, Calendar, DollarSign, Globe, Users, User } from "lucide-react";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "@/data/jobTypes";

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find(job => job.id === id);

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
                src={job.companyLogo} 
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
                  <span>Posted on {formatDate(job.postedAt)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-web3-primary/10 text-web3-primary border-none">
                  {JOB_TYPES[job.type]}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {job.category.replace(/-/g, ' ')}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {EXPERIENCE_LEVELS[job.experience]}
                </Badge>
                {job.featured && (
                  <Badge className="bg-amber-100 text-amber-700 border-none">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="md:text-right">
              <div className="text-xl font-semibold text-gray-900 mb-4">
                {job.salary}
              </div>
              <Button className="bg-web3-primary hover:bg-web3-dark text-white w-full md:w-auto">
                Apply Now
              </Button>
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
                <p className="mb-6">{job.description}</p>
                <p className="mb-6">
                  We are looking for talented individuals who are passionate about blockchain technology and want to make a difference in the Web3 ecosystem. As a {job.title} at {job.company}, you will have the opportunity to work on cutting-edge projects and collaborate with some of the brightest minds in the industry.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
                  Key Responsibilities:
                </h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Design, develop, and maintain blockchain applications and protocols</li>
                  <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
                  <li>Ensure the performance, quality, and responsiveness of applications</li>
                  <li>Identify and fix bugs and bottlenecks in the system</li>
                  <li>Stay up-to-date with the latest blockchain technologies and best practices</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
                  Requirements:
                </h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Proven experience in {job.category.replace(/-/g, ' ')} roles</li>
                  <li>Strong understanding of blockchain technology and Web3 concepts</li>
                  <li>Experience with at least one major blockchain platform (Ethereum, Solana, etc.)</li>
                  <li>Excellent problem-solving and analytical skills</li>
                  <li>Good communication and collaboration abilities</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
                  Benefits:
                </h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Competitive salary and equity options</li>
                  <li>Flexible working arrangements and remote-friendly environment</li>
                  <li>Professional development opportunities</li>
                  <li>Health insurance and wellness benefits</li>
                  <li>Work with a talented and diverse team in a fast-growing industry</li>
                </ul>
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
                    src={job.companyLogo} 
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
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <a href="#" className="text-web3-primary hover:underline">
                    Visit Website
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span>10+ Jobs Open</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>51-200 Employees</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>Founded in 2018</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full border-web3-primary text-web3-primary hover:bg-web3-primary/10">
                  View Company Profile
                </Button>
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
                    <div className="font-medium">{job.salary}</div>
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
                    <div className="font-medium">{JOB_TYPES[job.type]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Experience Level</div>
                    <div className="font-medium">{EXPERIENCE_LEVELS[job.experience]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Posted</div>
                    <div className="font-medium">{formatDate(job.postedAt)}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="w-full bg-web3-primary hover:bg-web3-dark text-white">
                  Apply for this job
                </Button>
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
