import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JobApplyComponent from "../../../component/user/JobApplyComponent";
import SingleJobDetailsComponent from "../../../component/user/SingleJobDetailsComponent";
import UserLayout from "../../../layouts/UserLayout";
import { applicationService } from "../../../services/ApplicationService";
import { jobService } from "../../../services/Job/jobService";

const JobApplyPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await jobService.getSingleJob(jobId);
        const jobData = response?.data?.data || response?.data;

        if (jobData) {
          setJob(jobData);
        } else {
          toast.error("Failed to fetch job details");
          navigate("/user/jobdetails");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details");
        navigate("/user/jobdetails");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, navigate]);

  const handleSubmitApplication = async (applicationData) => {
    if (!job) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("jobId", job._id || job.id);
      formData.append("name", applicationData.name);
      formData.append("email", applicationData.email);
      formData.append("contactNo", applicationData.contactNo);
      formData.append("location", applicationData.location);

      // Backend expects structured objects as JSON strings for certain fields
      formData.append(
        "education",
        JSON.stringify({
          highestQualification: applicationData.highestQualification,
          qualificationName: applicationData.qualificationName,
          institutionName: applicationData.institutionName,
          yearOfGraduation: applicationData.yearOfGraduation,
          cgpa: applicationData.cgpa,
        })
      );

      const workExperience = {};
      if (applicationData.totalExperience)
        workExperience.totalExperience = applicationData.totalExperience;
      if (applicationData.previousJobTitles)
        workExperience.previousJobTitles = applicationData.previousJobTitles;
      if (applicationData.companyNames)
        workExperience.companyNames = applicationData.companyNames;

      if (Object.keys(workExperience).length > 0) {
        formData.append("workExperience", JSON.stringify(workExperience));
      }

      const links = {};
      if (applicationData.githubProfile)
        links.githubProfile = applicationData.githubProfile;
      if (applicationData.linkedinProfile)
        links.linkedinProfile = applicationData.linkedinProfile;
      if (applicationData.personalWebsite)
        links.personalWebsite = applicationData.personalWebsite;

      if (Object.keys(links).length > 0) {
        formData.append("links", JSON.stringify(links));
      }

      formData.append("aboutYourself", applicationData.aboutYourself || "");
      formData.append("skills", JSON.stringify(applicationData.skills || []));

      if (applicationData.resume)
        formData.append("resume", applicationData.resume);
      if (applicationData.plusTwoCertificate)
        formData.append(
          "plusTwoCertificate",
          applicationData.plusTwoCertificate
        );
      if (applicationData.degreeCertificate)
        formData.append(
          "degreeCertificate",
          applicationData.degreeCertificate
        );
      if (applicationData.pgCertificate)
        formData.append("pgCertificate", applicationData.pgCertificate);

      const response =
        await applicationService.postJobApplication(formData);

      if (response.success) {
        setIsSubmitting(false);
        setShowSuccess(true);

        setTimeout(() => {
          navigate("/user/jobdetails", {
            state: { message: "Application submitted successfully!" },
          });
        }, 3000);
      } else {
        setIsSubmitting(false);
        toast.error(
          response.message || "Failed to submit application"
        );
      }
    } catch (error) {
      console.error("Error submitting application:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        errors: error.response?.data?.errors // Specifically log the errors object
      });
      setIsSubmitting(false);
      
      let errorMessage = "Failed to submit application. Please try again.";
      
      if (error?.response?.data?.errors) {
        // If there are field-specific errors, format them nicely
        const errorEntries = Object.entries(error.response.data.errors);
        errorMessage = errorEntries
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(' ') : msgs}`)
          .join(' | ');
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage, { 
        autoClose: 8000,
        position: "top-right",
        style: { width: '400px' }
      });
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
          <div className="bg-slate-700/30 backdrop-blur-md rounded-lg border border-slate-600/50 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">
              Loading job details...
            </p>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!job) {
    return (
      <UserLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
          <div className="bg-slate-700/30 backdrop-blur-md rounded-lg border border-slate-600/50 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Job Not Found
            </h3>
            <p className="text-gray-500 mb-4">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate("/user/jobdetails")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <SingleJobDetailsComponent job={job} />

          {isSubmitting && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-lg p-6 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-white">
                  Submitting your application...
                </p>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700 shadow-2xl animate-scaleIn">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-300">
                    Your application has been successfully submitted.
                  </p>
                </div>
              </div>
            </div>
          )}

          <JobApplyComponent
            onSubmitApplication={handleSubmitApplication}
          />
        </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </UserLayout>
  );
};

export default JobApplyPage;
