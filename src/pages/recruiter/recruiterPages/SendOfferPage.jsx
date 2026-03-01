import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Send, Mail, Briefcase, User, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import { applicationService } from "../../../services/ApplicationService";
import { recruiterAuthService } from "../../../services/RecruiterAuth.jsx";

const SendOfferPage = () => {
  const { applicationId } = useParams();
  const navigate          = useNavigate();
  const [loading,  setLoading]  = useState(true);
  const [sending,  setSending]  = useState(false);
  const [applicant, setApplicant] = useState(null);
  const [emailData, setEmailData] = useState({ subject: "", message: "" });

  useEffect(() => { fetchData(); }, [applicationId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appRes, profileRes] = await Promise.all([
        applicationService.getApplicantDetails(applicationId),
        recruiterAuthService.getRecruiterProfile(),
      ]);

      if (appRes?.success) {
        const app           = appRes.data.application;
        const jobTitle      = app.job?.title       || "Position";
        const candidateName = app.applicant?.name  || "Candidate";
        const rp            = profileRes?.success ? profileRes.data : null;
        const recruiterName = rp?.contact_person || rp?.username || rp?.email || "Recruiter";

        setApplicant(app);
        setEmailData({
          subject: `Job Offer – ${jobTitle}`,
          message: `Hi ${candidateName},\n\nWe are pleased to inform you that you have been selected for the role of ${jobTitle}.\n\nPlease reply to this email to confirm your acceptance.\n\nBest regards,\n${recruiterName}`,
        });
      } else {
        toast.error("Failed to fetch applicant details");
        navigate("/recruiter/applicants");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOffer = async (e) => {
    e.preventDefault();
    if (!emailData.subject.trim() || !emailData.message.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }
    try {
      setSending(true);
      const res = await applicationService.sendOffer(applicationId, emailData);
      if (res?.success) {
        toast.success("Offer email sent successfully");
        navigate(`/recruiter/applicants-details/${applicationId}`);
      } else {
        toast.error(res?.message || "Failed to send offer");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

   
  if (loading) return (
    <RecruiterLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin"/>
        <p className="text-slate-400 text-sm font-medium">Loading offer details…</p>
      </div>
    </RecruiterLayout>
  );

  const jobTitle      = applicant?.job?.title      || "N/A";
  const candidateName = applicant?.applicant?.name || "N/A";
  const candidateEmail= applicant?.applicant?.email|| "";

  return (
    <RecruiterLayout>
      <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
        <div className="max-w-4xl mx-auto px-6 pt-8">

           
          <button
            onClick={() => navigate(`/recruiter/applicants-details/${applicationId}`)}
            className="flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-8 group transition-colors"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="font-medium">Back to Applicant Profile</span>
          </button>

           
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                <Mail size={18} className="text-indigo-400"/>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">Send Job Offer</h1>
            </div>
            <p className="text-slate-500 text-sm ml-[52px]">
              Review and customise the offer email before sending
            </p>
          </div>

           
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-4 p-5 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-blue-400"/>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Candidate</p>
                <p className="text-white font-bold text-base truncate">{candidateName}</p>
                {candidateEmail && (
                  <p className="text-slate-500 text-xs truncate">{candidateEmail}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Briefcase size={16} className="text-purple-400"/>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Position</p>
                <p className="text-white font-bold text-base truncate">{jobTitle}</p>
              </div>
            </div>
          </div>

           
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">

             
            <div className="flex items-center gap-3 px-7 py-4 border-b border-slate-700/60 bg-slate-900/30">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/50"/>
                <span className="w-3 h-3 rounded-full bg-amber-500/50"/>
                <span className="w-3 h-3 rounded-full bg-emerald-500/50"/>
              </div>
              <span className="text-slate-500 text-xs font-semibold ml-2">Send Mail</span>
            </div>

            <form onSubmit={handleSendOffer} className="p-7 space-y-6">

               
              <div className="flex items-center gap-3 pb-5 border-b border-slate-700/40">
                <span className="text-slate-500 text-sm font-semibold w-16 flex-shrink-0">To</span>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-700/40 rounded-xl">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">
                    {candidateName?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{candidateName}</span>
                  {candidateEmail && (
                    <span className="text-slate-600 text-xs">&lt;{candidateEmail}&gt;</span>
                  )}
                </div>
              </div>

               
              <div className="flex items-center gap-3 pb-5 border-b border-slate-700/40">
                <span className="text-slate-500 text-sm font-semibold w-16 flex-shrink-0">Subject</span>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(p => ({ ...p, subject: e.target.value }))}
                  placeholder="Enter email subject"
                  required
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-600
                    focus:outline-none focus:ring-0 border-0"
                />
              </div>

               
              <div>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData(p => ({ ...p, message: e.target.value }))}
                  rows={11}
                  placeholder="Write your offer message here…"
                  required
                  className="w-full bg-transparent text-slate-200 text-sm leading-relaxed
                    placeholder:text-slate-600 focus:outline-none resize-none border-0 focus:ring-0"
                />
              </div>

               
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-700/40">
                <button
                  type="button"
                  onClick={() => navigate(`/recruiter/applicants-details/${applicationId}`)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-slate-700
                    text-slate-400 hover:text-white hover:border-slate-500 bg-slate-900/30 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2.5 px-8 py-3 rounded-xl font-bold text-sm
                    bg-gradient-to-r from-indigo-600 to-violet-600
                    hover:from-indigo-500 hover:to-violet-500
                    text-white shadow-lg shadow-indigo-500/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-95 transition-all duration-150"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15}/>
                      Send Offer Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

           
          <p className="flex items-center gap-2 text-slate-600 text-xs mt-4 px-1">
            <CheckCircle size={12}/>
            Sending this offer will mark the application as <span className="text-emerald-500 font-semibold">Accepted</span>
          </p>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default SendOfferPage;