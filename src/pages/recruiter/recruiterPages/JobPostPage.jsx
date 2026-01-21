import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jobService } from "../../../services/Job/jobService";
import JobPostComponent from "../../../component/recruiter/JobPostComponent";
import RecruiterLayout from "../../../layouts/RecruiterLayout";

const JobPostPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const jobToEdit = location.state?.jobs;

  const getInitialFormData = () => {
    if (!jobToEdit) return undefined;

    return {
      role: jobToEdit.jobrole || "",
      jobLocation: jobToEdit.jobLocation || "",
      workTime: jobToEdit.workTime || "",
      workMode: jobToEdit.workMode || "",
      minExperience: jobToEdit.minExperience || "",
      minSalary: jobToEdit.minSalary || "",
      maxSalary: jobToEdit.maxSalary || "",
      requirements: jobToEdit.requirements || [],
      responsibilities: jobToEdit.responsibilities || [],
    };
  };

  const transformFormDataToJobPost = (formData) => {
    // Backend expects uppercase choices: REMOTE, ONSITE, HYBRID
    const mappedJobType = formData.workMode === "on-site" ? "ONSITE" : formData.workMode.toUpperCase();
    
    return {
      title: formData.role,
      // Combining details into description for now to avoid additional model changes
      description: `Description: ${formData.responsibilities.join(". ") || "No responsibilities listed."}\n\nWork Time: ${formData.workTime}\nSalary: ${formData.minSalary}-${formData.maxSalary} LPA`,
      location: formData.jobLocation,
      job_type: mappedJobType,
      skills: formData.requirements,
      experience: parseInt(formData.minExperience) || 0,
      status: "OPEN",
    };
  };

  const submitJobDetails = async (jobData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const jobPostData = transformFormDataToJobPost(jobData);
      console.log("Job Details to be sent:", jobPostData);

      let response;

      if (jobToEdit?._id) {
        response = await jobService.updateJobDetails(
          jobToEdit._id,
          jobPostData
        );

        setSubmitStatus({
          type: "success",
          message: "Job updated successfully!",
        });
      } else {
        response = await jobService.postJobDetails(jobPostData);

        setSubmitStatus({
          type: "success",
          message:
            "Job posted successfully! Candidates will be able to apply soon.",
        });
      }

      console.log("API Response:", response);

      setTimeout(() => {
        setSubmitStatus(null);
        navigate("/recruiter/portal");
      }, 1000);
    } catch (error) {
      console.error("Error submitting job:", error);

      let errorMessage = jobToEdit
        ? "Failed to update job. Please try again."
        : "Failed to post job. Please try again.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.statusText) {
        errorMessage = `Error: ${error.response.statusText}`;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RecruiterLayout>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-8 border border-slate-500">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <span className="text-white text-lg font-semibold">
                {jobToEdit ? "Updating your job..." : "Posting your job..."}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal or notification can be handled here */}

      <JobPostComponent
        onSubmit={submitJobDetails}
        initialData={getInitialFormData()}
        isEditMode={!!jobToEdit}
      />
    </RecruiterLayout>
  );
};

export default JobPostPage;
