import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Clock, Eye, EyeOff, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "@/data/jobTypes";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  created_at: string;
  published: boolean;
  expires_at: string;
  verification_status: "pending" | "approved" | "rejected";
  user_id: string; // Added this property
}

const DashboardPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { isAdmin } = useAdmin();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchJobs();
  }, [user, navigate, authLoading, showAllJobs]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });
      
      // If admin and showing all jobs, don't filter by user_id
      if (!(isAdmin && showAllJobs)) {
        query = query.eq("user_id", user?.id);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Cast the verification_status to the correct type
      const typedJobs = data?.map(job => ({
        ...job,
        verification_status: job.verification_status as "pending" | "approved" | "rejected"
      })) || [];

      setJobs(typedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load job listings");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublished = async (jobId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ published: !currentStatus })
        .eq("id", jobId);

      if (error) throw error;

      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, published: !currentStatus } : job
        )
      );

      toast.success(
        currentStatus
          ? "Job listing is now hidden"
          : "Job listing is now published"
      );
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job status");
    }
  };

  const updateVerificationStatus = async (jobId: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ verification_status: status })
        .eq("id", jobId);

      if (error) throw error;

      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, verification_status: status } : job
        )
      );

      toast.success(`Job ${status === "approved" ? "approved" : "rejected"} successfully`);
    } catch (error) {
      console.error("Error updating verification status:", error);
      toast.error("Failed to update verification status");
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job listing? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) throw error;

      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      toast.success("Job listing deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job listing");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderVerificationStatus = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-none">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-none">Rejected</Badge>;
      case "pending":
      default:
        return <Badge className="bg-amber-100 text-amber-800 border-none">Pending Review</Badge>;
    }
  };

  if (authLoading) {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-2">
            {isAdmin && (
              <Button 
                variant="outline" 
                onClick={() => setShowAllJobs(!showAllJobs)}
                className="mr-2"
              >
                {showAllJobs ? "Show My Jobs" : "Show All Jobs"}
              </Button>
            )}
            <Button asChild className="bg-web3-primary hover:bg-web3-dark">
              <Link to="/post-job">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {isAdmin && showAllJobs ? "All Job Listings" : "My Job Listings"}
              </CardTitle>
              <CardDescription>
                {isAdmin && showAllJobs 
                  ? "Manage all job postings including those pending review" 
                  : "Manage your job postings and check their status"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-web3-primary" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    {isAdmin && showAllJobs 
                      ? "There are no job listings in the system" 
                      : "You haven't posted any jobs yet"}
                  </p>
                  <Button asChild className="bg-web3-primary hover:bg-web3-dark">
                    <Link to="/post-job">Post Your First Job</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Job</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Verification</th>
                        <th className="px-6 py-3">Posted</th>
                        <th className="px-6 py-3">Expires</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobs.map((job) => (
                        <tr key={job.id}>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {job.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {job.company} • {job.location}
                              </div>
                              <div className="mt-1 flex gap-2">
                                <Badge variant="outline">
                                  {JOB_TYPES[job.type as keyof typeof JOB_TYPES]}
                                </Badge>
                                <Badge variant="outline">
                                  {EXPERIENCE_LEVELS[job.experience as keyof typeof EXPERIENCE_LEVELS]}
                                </Badge>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {job.published ? (
                              <Badge className="bg-green-100 text-green-800 border-none">
                                Published
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-800 border-none">
                                Draft
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {renderVerificationStatus(job.verification_status)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatDate(job.created_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(job.expires_at)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {/* Regular user actions */}
                              {(!isAdmin || user?.id === job.user_id) && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => togglePublished(job.id, job.published)}
                                    title={job.published ? "Unpublish" : "Publish"}
                                    disabled={job.verification_status !== 'approved'}
                                  >
                                    {job.published ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/edit-job/${job.id}`)}
                                    title="Edit"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteJob(job.id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              
                              {/* Admin verification actions */}
                              {isAdmin && job.verification_status === 'pending' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateVerificationStatus(job.id, 'approved')}
                                    className="text-green-500 hover:text-green-700"
                                    title="Approve"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateVerificationStatus(job.id, 'rejected')}
                                    className="text-red-500 hover:text-red-700"
                                    title="Reject"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
