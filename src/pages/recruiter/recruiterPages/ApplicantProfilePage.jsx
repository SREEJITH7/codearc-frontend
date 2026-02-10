import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, Mail, Phone, Briefcase, Calendar, 
  ChevronLeft, CheckCircle, XCircle, Clock, Star, 
  Trophy, BookOpen, Percent, Send
} from "lucide-react";
import { toast } from "react-toastify";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import { applicationService } from "../../../services/ApplicationService";
import Button from "../../../component/common/Button";

const ApplicantProfilePage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplicantDetails();
  }, [applicationId]);

  const fetchApplicantDetails = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getApplicantDetails(applicationId);
      if (res?.success) {
        setApplicant(res.data.application);
      } else {
        toast.error("Failed to fetch applicant details");
      }
    } catch (err) {
      console.error("Error fetching applicant details:", err);
      toast.error("An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await applicationService.updateApplicationStatus(applicationId, newStatus);
      if (res?.success) {
        // Success toasts based on status
        if (newStatus === "shortlisted") {
          toast.success("Applicant shortlisted successfully");
        } else if (newStatus === "rejected") {
          toast.success("Application rejected");
        } else {
          toast.success(`Application ${newStatus} successfully`);
        }
        setApplicant(prev => ({ ...prev, status: newStatus.toUpperCase() }));
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      // Handle the specific "This action is not allowed" or other backend messages
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "pending":
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/30 flex items-center gap-2"><Clock size={14}/> Pending</span>;
      case "shortlisted":
        return <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 flex items-center gap-2"><Star size={14}/> Shortlisted</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium border border-red-500/30 flex items-center gap-2"><XCircle size={14}/> Rejected</span>;
      case "accepted":
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30 flex items-center gap-2"><CheckCircle size={14}/> Accepted</span>;
      default:
        return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-medium border border-gray-500/30">{status}</span>;
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="p-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </RecruiterLayout>
    );
  }

  if (!applicant) {
    return (
      <RecruiterLayout>
        <div className="p-8 text-center text-gray-400">
          <p>Applicant not found</p>
          <Button variant="secondary" onClick={() => navigate("/recruiter/applicants")} className="mt-4">
            Back to Applicants
          </Button>
        </div>
      </RecruiterLayout>
    );
  }

  const applicantInfo = applicant.applicant || {};
  const codingStats = applicant.codingStats || {};
  const jobInfo = applicant.job || {};

  return (
    <RecruiterLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header/Nav */}
        <button 
          onClick={() => navigate("/recruiter/applicants")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          <span>Back to Applicants</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg overflow-hidden border-2 border-slate-700">
                    {applicantInfo.profileImage ? (
                      <img 
                        src={`http://localhost:8000${applicantInfo.profileImage}`} 
                        alt={applicantInfo.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      applicantInfo.name?.charAt(0)?.toUpperCase()
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{applicantInfo.name || "N/A"}</h1>
                    <p className="text-gray-400 flex items-center gap-2">
                       {applicantInfo.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(applicant.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-200">
                      <Mail className="text-indigo-400" size={18} />
                      <span>{applicantInfo.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <Phone className="text-indigo-400" size={18} />
                      <span>{applicantInfo.contactNo || "N/A"}</span>
                    </div>
                    {applicantInfo.location && (
                      <div className="flex items-center gap-3 text-gray-200">
                        <User className="text-indigo-400" size={18} />
                        <span>{applicantInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Job Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-200">
                      <Briefcase className="text-purple-400" size={18} />
                      <span>{jobInfo.title || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <Calendar className="text-purple-400" size={18} />
                      <span>Applied on {new Date(applicant.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Stats Card */}
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-400" />
                Coding Performance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard 
                  icon={<Star className="text-blue-400" />} 
                  label="Global Rank" 
                  value={codingStats.rank ? `#${codingStats.rank}` : "N/A"} 
                />
                <StatCard 
                  icon={<Trophy className="text-yellow-400" />} 
                  label="Total Score" 
                  value={codingStats.score ?? 0} 
                />
                <StatCard 
                  icon={<BookOpen className="text-green-400" />} 
                  label="Solved" 
                  value={codingStats.totalSolved ?? 0} 
                />
                <StatCard 
                  icon={<Percent className="text-purple-400" />} 
                  label="Acceptance" 
                  value={`${codingStats.acceptanceRate ?? 0}%`} 
                />
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Application Actions</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">Update the status of this application</p>
              
              <div className="space-y-3">
                {applicant.status === "PENDING" && (
                  <>
                    <button
                      disabled={updating}
                      onClick={() => handleStatusUpdate("shortlisted")}
                      className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Star size={18} />
                      Shortlist Applicant
                    </button>
                    <button
                      disabled={updating}
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <XCircle size={18} />
                      Reject Application
                    </button>
                  </>
                )}

                {applicant.status === "SHORTLISTED" && (
                  <>
                    <button
                      disabled={updating}
                      onClick={() => navigate(`/recruiter/applicants-details/${applicationId}/send-offer`)}
                      className="w-full py-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send size={18} />
                      Send Offer
                    </button>
                    <button
                      disabled={updating}
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <XCircle size={18} />
                      Reject Application
                    </button>
                  </>
                )}

                {applicant.status === "ACCEPTED" && (
                  <button
                    disabled
                    className="w-full py-3 bg-green-600/20 border border-green-500/30 text-green-400 rounded-xl font-semibold flex items-center justify-center gap-2 opacity-100"
                  >
                    <CheckCircle size={18} />
                    Accepted
                  </button>
                )}

                {applicant.status === "REJECTED" && (
                   <p className="text-center text-red-400 font-medium py-2 bg-red-500/5 rounded-lg border border-red-500/10">
                     Application Rejected
                   </p>
                )}

                {updating && (
                  <div className="flex justify-center pt-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-indigo-500"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Resume/Documents Placeholders */}
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Documents</h3>
              <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 flex items-center justify-between">
                <span className="text-sm text-gray-300">Resume</span>
                {applicant.resume ? (
                  <a 
                    href={`http://localhost:8000${applicant.resume}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 font-medium cursor-pointer hover:underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-xs text-gray-500">Not provided</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};


const StatCard = ({ icon, label, value }) => (
  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 text-center">
    <div className="flex justify-center mb-2">{icon}</div>
    <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1 font-medium">{label}</p>
    <p className="text-xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

export default ApplicantProfilePage;

