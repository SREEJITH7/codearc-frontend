import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Send, Mail, Briefcase, User } from "lucide-react";
import { toast } from "react-toastify";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import { applicationService } from "../../../services/ApplicationService";
import { recruiterAuthService } from "../../../services/RecruiterAuth.jsx";
import Button from "../../../component/common/Button";

const SendOfferPage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [applicant, setApplicant] = useState(null);
  
  const [emailData, setEmailData] = useState({
    subject: "",
    message: ""
  });

  useEffect(() => {
    fetchData();
  }, [applicationId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch both applicant details and recruiter profile
      const [appRes, profileRes] = await Promise.all([
        applicationService.getApplicantDetails(applicationId),
        recruiterAuthService.getRecruiterProfile()
      ]);

      if (appRes?.success) {
        const app = appRes.data.application;
        setApplicant(app);
        
        const jobTitle = app.job?.title || "Position";
        const candidateName = app.applicant?.name || "Candidate";
        
        // Use contact_person from profile, fallback to username, email or "Recruiter"
        const recruiterProfile = profileRes?.success ? profileRes.data : null;
        const recruiterName = recruiterProfile?.contact_person || recruiterProfile?.username || recruiterProfile?.email || "Recruiter";

        setEmailData({
          subject: `Job Offer – ${jobTitle}`,
          message: `Hi ${candidateName},\n\nWe are pleased to inform you that you have been selected for the role of ${jobTitle}.\n\nPlease reply to confirm your acceptance.\n\nBest regards,\n${recruiterName}`
        });
      } else {
        toast.error("Failed to fetch applicant details");
        navigate("/recruiter/applicants");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOffer = async (e) => {
    e.preventDefault();
    if (!emailData.subject || !emailData.message) {
      toast.error("Please fill in both subject and message");
      return;
    }

    try {
      setSending(true);
      const res = await applicationService.sendOffer(applicationId, emailData);
      if (res?.success) {
        toast.success("Offer email sent successfully");
        toast.success("Application accepted");
        navigate(`/recruiter/applicants-details/${applicationId}`);
      } else {
        toast.error(res?.message || "Failed to send offer");
      }
    } catch (err) {
      console.error("Error sending offer:", err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
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

  return (
    <RecruiterLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <button 
          onClick={() => navigate(`/recruiter/applicants-details/${applicationId}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          <span>Back to Profile</span>
        </button>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
              <Mail size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Send Job Offer</h1>
              <p className="text-gray-400">Review and customize the offer email for {applicant?.applicant?.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-700/50 flex items-center gap-3">
                <Briefcase className="text-purple-400" size={18} />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Role</p>
                  <p className="text-white font-medium">{applicant?.job?.title}</p>
                </div>
             </div>
             <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-700/50 flex items-center gap-3">
                <User className="text-blue-400" size={18} />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Candidate</p>
                  <p className="text-white font-medium">{applicant?.applicant?.name}</p>
                </div>
             </div>
          </div>

          <form onSubmit={handleSendOffer} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter email subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Email Content
              </label>
              <textarea
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                rows={10}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Write your offer message here..."
                required
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button 
                type="submit" 
                variant="primary" 
                className="flex-1 py-4 text-lg"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Offer Email</span>
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate(`/recruiter/applicants-details/${applicationId}`)}
                className="px-8"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default SendOfferPage;
