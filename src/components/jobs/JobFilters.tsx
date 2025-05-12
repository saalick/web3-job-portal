
import React, { useState } from "react";
import { Check, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobType, JobCategory, ExperienceLevel, JOB_CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES } from "@/data/jobTypes";

interface JobFiltersProps {
  onFilterChange: (filters: {
    search: string;
    jobTypes: JobType[];
    categories: JobCategory[];
    experienceLevels: ExperienceLevel[];
  }) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({
      search: e.target.value,
      jobTypes,
      categories,
      experienceLevels,
    });
  };

  const toggleJobType = (jobType: JobType) => {
    const newJobTypes = jobTypes.includes(jobType)
      ? jobTypes.filter((type) => type !== jobType)
      : [...jobTypes, jobType];
    
    setJobTypes(newJobTypes);
    onFilterChange({
      search,
      jobTypes: newJobTypes,
      categories,
      experienceLevels,
    });
  };

  const toggleCategory = (category: JobCategory) => {
    const newCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];
    
    setCategories(newCategories);
    onFilterChange({
      search,
      jobTypes,
      categories: newCategories,
      experienceLevels,
    });
  };

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    const newLevels = experienceLevels.includes(level)
      ? experienceLevels.filter((l) => l !== level)
      : [...experienceLevels, level];
    
    setExperienceLevels(newLevels);
    onFilterChange({
      search,
      jobTypes,
      categories,
      experienceLevels: newLevels,
    });
  };

  const clearAllFilters = () => {
    setSearch("");
    setJobTypes([]);
    setCategories([]);
    setExperienceLevels([]);
    onFilterChange({
      search: "",
      jobTypes: [],
      categories: [],
      experienceLevels: [],
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search jobs, keywords, companies..."
            className="pl-9"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Job Type</span>
                <span className="ml-1 bg-gray-100 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {jobTypes.length || 0}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Job Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.entries(JOB_TYPES).map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleJobType(key as JobType)}
                >
                  <span>{label}</span>
                  {jobTypes.includes(key as JobType) && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Categories</span>
                <span className="ml-1 bg-gray-100 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {categories.length || 0}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Job Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                {Object.entries(JOB_CATEGORIES).map(([key, label]) => (
                  <DropdownMenuItem
                    key={key}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(key as JobCategory)}
                  >
                    <span>{label}</span>
                    {categories.includes(key as JobCategory) && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Experience</span>
                <span className="ml-1 bg-gray-100 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {experienceLevels.length || 0}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Experience Levels</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.entries(EXPERIENCE_LEVELS).map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExperienceLevel(key as ExperienceLevel)}
                >
                  <span>{label}</span>
                  {experienceLevels.includes(key as ExperienceLevel) && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(search || jobTypes.length > 0 || categories.length > 0 || experienceLevels.length > 0) && (
            <Button variant="ghost" onClick={clearAllFilters} className="text-web3-primary">
              Clear All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
