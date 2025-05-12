
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCategory, JobType, ExperienceLevel, JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from "@/data/jobTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Zod schema for job form validation
const jobFormSchema = z.object({
  title: z.string().min(3, { message: "Job title must be at least 3 characters long" }),
  company: z.string().min(2, { message: "Company name is required" }),
  companyLogo: z.string().optional(),
  location: z.string().min(2, { message: "Location is required" }),
  salaryRange: z.string().optional(),
  description: z.string().min(50, { message: "Description must be at least 50 characters long" }),
  type: z.enum(["full-time", "freelance"] as const),
  category: z.enum([
    "blockchain-development", "smart-contracts", "frontend", "backend", 
    "design", "product", "marketing", "business", "legal", "community", "other"
  ] as const),
  experience: z.enum(["entry", "mid", "senior", "lead"] as const),
  skills: z.string().transform((val) => val.split(",").map((s) => s.trim()).filter((s) => s !== "")),
  applicationLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal("")),
  published: z.boolean().default(false),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const PostJobPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      companyLogo: "",
      location: "",
      salaryRange: "",
      description: "",
      type: "full-time",
      category: "blockchain-development",
      experience: "mid",
      skills: "",
      applicationLink: "",
      contactEmail: "",
      published: false,
    },
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // If ID parameter exists, we're in edit mode
    if (id) {
      setIsEditing(true);
      fetchJobDetails(id);
    }
  }, [user, navigate, authLoading, id]);

  const fetchJobDetails = async (jobId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Transform skills array to comma-separated string
        const skillsString = data.skills.join(", ");
        
        form.reset({
          title: data.title,
          company: data.company,
          companyLogo: data.company_logo || "",
          location: data.location,
          salaryRange: data.salary_range || "",
          description: data.description,
          type: data.type as JobType,
          category: data.category as JobCategory,
          experience: data.experience as ExperienceLevel,
          skills: skillsString,
          applicationLink: data.application_link || "",
          contactEmail: data.contact_email || "",
          published: data.published,
        });
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error("Failed to load job details");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: JobFormValues) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const jobData = {
        title: values.title,
        company: values.company,
        company_logo: values.companyLogo || null,
        location: values.location,
        salary_range: values.salaryRange || null,
        description: values.description,
        type: values.type,
        category: values.category,
        experience: values.experience,
        skills: values.skills,
        application_link: values.applicationLink || null,
        contact_email: values.contactEmail || null,
        user_id: user.id,
        published: values.published,
      };

      let response;
      
      if (isEditing && id) {
        response = await supabase
          .from("jobs")
          .update(jobData)
          .eq("id", id);
      } else {
        response = await supabase
          .from("jobs")
          .insert([jobData]);
      }

      const { error } = response;

      if (error) {
        throw error;
      }

      toast.success(
        isEditing
          ? "Job listing updated successfully"
          : "Job listing created successfully"
      );
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job listing");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-web3-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditing ? "Edit Job Listing" : "Post a New Job"}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill out the form below to post your job to Web3 Jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Blockchain Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Web3 Company Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyLogo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Logo URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide a URL to your company logo
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Remote, New York, NY, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salaryRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Range (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $80,000 - $120,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(JOB_TYPES).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(JOB_CATEGORIES).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(EXPERIENCE_LEVELS).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Solidity, React, Node.js (comma separated)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter skills separated by commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role, responsibilities, requirements, benefits, etc."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="applicationLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Link (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/apply" {...field} />
                          </FormControl>
                          <FormDescription>
                            Where should candidates apply?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="jobs@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email for applicant inquiries
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Publish immediately
                          </FormLabel>
                          <FormDescription>
                            If unchecked, the job will be saved as a draft
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      className="bg-web3-primary hover:bg-web3-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : isEditing ? (
                        "Update Job Listing"
                      ) : (
                        "Create Job Listing"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobPage;
