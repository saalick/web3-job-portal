
export type JobType = 'full-time' | 'freelance';

export type JobCategory = 
  | 'blockchain-development' 
  | 'smart-contracts' 
  | 'frontend' 
  | 'backend' 
  | 'design' 
  | 'product' 
  | 'marketing' 
  | 'business' 
  | 'legal' 
  | 'community'
  | 'other';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead';

export const JOB_CATEGORIES: Record<JobCategory, string> = {
  'blockchain-development': 'Blockchain Development',
  'smart-contracts': 'Smart Contracts',
  'frontend': 'Frontend Development',
  'backend': 'Backend Development',
  'design': 'Design',
  'product': 'Product',
  'marketing': 'Marketing',
  'business': 'Business',
  'legal': 'Legal',
  'community': 'Community',
  'other': 'Other',
};

export const EXPERIENCE_LEVELS: Record<ExperienceLevel, string> = {
  'entry': 'Entry Level',
  'mid': 'Mid Level',
  'senior': 'Senior Level',
  'lead': 'Lead / Management',
};

export const JOB_TYPES: Record<JobType, string> = {
  'full-time': 'Full-time',
  'freelance': 'Freelance',
};
