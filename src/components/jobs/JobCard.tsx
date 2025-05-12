
import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Briefcase, Tag } from "lucide-react";
import { Job } from "@/data/mockJobs";
import { Badge } from "@/components/ui/badge";
import { JOB_TYPES } from "@/data/jobTypes";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Format date to relative time (e.g., "2 days ago")
  const getRelativeTimeString = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className={`border ${job.featured ? 'border-web3-light border-l-4 border-l-web3-primary' : 'border-gray-200'} rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-in`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
            <img 
              src={job.companyLogo} 
              alt={`${job.company} logo`} 
              className="w-full h-full object-contain p-1" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placeholder.svg';
              }}
            />
          </div>
          
          <div>
            <Link to={`/job/${job.id}`} className="block">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-web3-primary transition-colors">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <span>{job.company}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{getRelativeTimeString(job.postedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={14} />
                <span>{JOB_TYPES[job.type]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag size={14} />
                <span>{job.category.replace(/-/g, ' ')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="text-base font-medium text-gray-900">{job.salary}</div>
          {job.featured && (
            <Badge className="bg-web3-primary/10 text-web3-primary hover:bg-web3-primary/20 border border-web3-primary/20">
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <p className="text-gray-600 text-sm line-clamp-2">
          {job.description}
        </p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 5).map((skill, index) => (
          <Badge key={index} variant="outline" className="bg-gray-50">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 5 && (
          <Badge variant="outline" className="bg-gray-50">
            +{job.skills.length - 5} more
          </Badge>
        )}
      </div>
    </div>
  );
};

export default JobCard;
