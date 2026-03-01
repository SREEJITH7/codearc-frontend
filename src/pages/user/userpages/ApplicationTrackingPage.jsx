import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import { jobService } from "../../../services/Job/jobService";
import { CheckCircle, Clock, FileText, Briefcase, MapPin, Calendar, ChevronsRight, AlertCircle, CheckCircle2 } from "lucide-react";

const ApplicationTrackingPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getSingleJob(jobId);
        setData(response?.data?.data || response?.data);
      } catch (error) {
        console.error("Error fetching application details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  if (loading) {
    return (
      <UserLayout>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </UserLayout>
    );
  }

  if (!data || !data.application) {
    return (
      <UserLayout>
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Not Found</h2>
          <p className="text-gray-400 mb-6">We couldn't find an application for this job from your account.</p>
          <button 
            onClick={() => navigate("/user/jobdetails")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Browse Jobs
          </button>
        </div>
      </UserLayout>
    );
  }

  const { application, title, location, job_type } = data;
  const status = application.status;

  const steps = [
    { key: "PENDING", label: "Applied", icon: CheckCircle, description: "Your application has been received" },
    { key: "REVIEWED", label: "Reviewed", icon: FileText, description: "Recruiter is reviewing your profile" },
    { key: "SHORTLISTED", label: "Shortlisted", icon: Clock, description: "You are on the shortlist for this role" },
    { key: "FINAL", label: "Final Decision", icon: CheckCircle2, description: "Process completed" },
  ];

  // Map backend status to stepper index
  const statusMapping = {
    'PENDING': 0,
    'REVIEWED': 1,
    'SHORTLISTED': 2,
    'ACCEPTED': 3,
    'REJECTED': 3,
  };

  const currentStepIndex = statusMapping[status] ?? 0;
  const isRejected = status === 'REJECTED';
  const isAccepted = status === 'ACCEPTED';

  return (
    <UserLayout>
      <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job_type}</span>
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {location}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} /> Applied on {new Date(application.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate("/user/jobdetails")}
              className="self-start md:self-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg text-sm font-medium transition-colors border border-slate-700"
            >
              Back to Jobs
            </button>
          </div>

          {/* Status Stepper Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-10">
            <h2 className="text-xl font-semibold mb-8 flex items-center gap-2">
              Application Status: 
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isRejected ? 'bg-red-500/20 text-red-400' : 
                isAccepted ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {status}
              </span>
            </h2>

            <div className="relative">
              {/* Stepper Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-700 hidden md:block" />
              <div 
                className={`absolute top-6 left-6 h-0.5 transition-all duration-500 hidden md:block ${isRejected ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />

              <div className="flex flex-col md:flex-row justify-between gap-8 relative">
                {steps.map((step, index) => {
                  let StepIcon = step.icon;
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const isFinal = index === steps.length - 1;

                  let iconColor = "text-slate-500";
                  let bgColor = "bg-slate-800";
                  let borderColor = "border-slate-700";

                  if (isCompleted) {
                    iconColor = "text-white";
                    bgColor = isRejected && isFinal ? "bg-red-500" : "bg-blue-600";
                    borderColor = isRejected && isFinal ? "border-red-500" : "border-blue-600";
                  } else if (isCurrent) {
                    iconColor = isRejected ? "text-red-400" : "text-blue-400";
                    bgColor = "bg-slate-900";
                    borderColor = isRejected ? "border-red-500" : "border-blue-500";
                  }

                  // Handle Final Step specifically for Accepted/Rejected
                  let stepLabel = step.label;
                  let stepDescription = step.description;
                  if (isFinal) {
                    if (isRejected) {
                      stepLabel = "Not Selected";
                      stepDescription = "Application was not selected at this time";
                      StepIcon = AlertCircle;
                    } else if (isAccepted) {
                      stepLabel = "Selected";
                      stepDescription = "Congratulations! You've been selected";
                      StepIcon = CheckCircle2;
                    }
                  }

                  return (
                    <div key={step.key} className="flex md:flex-col items-start md:items-center gap-4 md:text-center md:w-1/4">
                      <div className={`relative z-10 w-12 h-12 rounded-full border-2 ${bgColor} ${borderColor} flex items-center justify-center shrink-0 transition-colors duration-300`}>
                        <StepIcon className={`w-6 h-6 ${iconColor}`} />
                        {isCompleted && !isFinal && (
                          <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-blue-500 hidden md:block">
                            <ChevronsRight size={16} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className={`font-bold ${isCurrent ? 'text-white' : 'text-gray-400'}`}>{stepLabel}</h3>
                        <p className="text-xs text-gray-500 max-w-[150px]">{stepDescription}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions / Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <FileText className="text-blue-400" size={20} />
                  Application Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Submitted Name</p>
                    <p className="text-white font-medium">{application.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Contact Email</p>
                    <p className="text-white font-medium">{application.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Resume</p>
                    <a 
                      href={application.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                    >
                      <FileText size={16} /> View Resume
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Last Updated</p>
                    <p className="text-white font-medium">{new Date(application.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Clock className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">What's next?</h4>
                  <p className="text-sm text-blue-200/70 leading-relaxed">
                    Recruiters usually take 3-5 business days to review applications. You will receive an email notification if there is an update to your application status. Keep your profile updated for better visibility!
                  </p>
                </div>
              </div>
            </div>

            {/* Job Summary Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4 text-white">Job Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-500 mb-1">Position</p>
                  <p className="font-bold text-white">{title}</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-500 mb-1">Work Type</p>
                  <p className="font-bold text-white">{job_type}</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-bold text-white">{location}</p>
                </div>
                <button 
                  onClick={() => navigate(`/user/jobdetails`)}
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors border border-slate-600"
                >
                  View Full Job Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ApplicationTrackingPage;
