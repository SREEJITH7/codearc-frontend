
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

    const getVal = (key1, key2) => {
      const val = jobToEdit[key1] !== undefined && jobToEdit[key1] !== null
        ? jobToEdit[key1]
        : jobToEdit[key2];
      return val !== undefined && val !== null ? val : "";
    };

    return {
      role:            getVal("jobrole", "title"),
      jobLocation:     getVal("jobLocation", "location"),
      workTime:        getVal("workTime", "work_time"),
      workMode:        getVal("workMode", "job_type"),
      minExperience:   getVal("minExperience", "experience"),
      minSalary:       getVal("minSalary", "min_salary"),
      maxSalary:       getVal("maxSalary", "max_salary"),
      requirements:    jobToEdit.requirements || jobToEdit.skills || [],
      responsibilities: jobToEdit.responsibilities || [],
    };
  };

  const transformFormDataToJobPost = (formData) => {
    const modeMapping = {
      remote:   "REMOTE",
      "on-site": "ONSITE",
      hybrid:   "HYBRID",
      REMOTE:   "REMOTE",
      ONSITE:   "ONSITE",
      HYBRID:   "HYBRID",
    };

    const toInt = (val) => {
      const n = parseInt(val, 10);
      return isNaN(n) ? 0 : n;
    };
    console.log("SALARY DEBUG:", {
    minSalary: formData.minSalary,
    maxSalary: formData.maxSalary,
    minType: typeof formData.minSalary,
    maxType: typeof formData.maxSalary,
    minParsed: toInt(formData.minSalary),
    maxParsed: toInt(formData.maxSalary),
  });

    return {
      title:            formData.role,
      description:      "No description provided",
      location:         formData.jobLocation,
      job_type:         modeMapping[formData.workMode] || formData.workMode?.toUpperCase() || "REMOTE",
      work_time:        formData.workTime,
      experience:       toInt(formData.minExperience),

      // CRITICAL: send camelCase keys — the serializer declares fields as
      // minSalary/maxSalary (camelCase). to_internal_value maps them to
      // min_salary/max_salary before saving. Sending snake_case means DRF
      // finds no matching field and silently drops the values.
      minSalary:        toInt(formData.minSalary),
      maxSalary:        toInt(formData.maxSalary),

      skills:           formData.requirements,
      responsibilities: formData.responsibilities,
      status:           "OPEN",
    };
  };

  const submitJobDetails = async (jobData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const jobPostData = transformFormDataToJobPost(jobData);
      console.log("Payload being sent:", JSON.stringify(jobPostData, null, 2));

      let response;
      if (jobToEdit?._id) {
        response = await jobService.updateJobDetails(jobToEdit._id, jobPostData);
        setSubmitStatus({ type: "success", message: "Job updated successfully!" });
      } else {
        response = await jobService.postJobDetails(jobPostData);
        setSubmitStatus({
          type: "success",
          message: "Job posted successfully! Candidates will be able to apply soon.",
        });
      }

      console.log("API Response:", response?.data);

      setTimeout(() => {
        setSubmitStatus(null);
        navigate("/recruiter/viewallpost");
      }, 1000);
    } catch (error) {
      console.error("Error submitting job:", error);
      console.error("Response data:", error?.response?.data);

      let errorMessage = jobToEdit
        ? "Failed to update job. Please try again."
        : "Failed to post job. Please try again.";

      if (error?.response?.data?.message)   errorMessage = error.response.data.message;
      else if (error?.response?.statusText) errorMessage = `Error: ${error.response.statusText}`;
      else if (error?.message)              errorMessage = error.message;

      setSubmitStatus({ type: "error", message: errorMessage });
      setTimeout(() => setSubmitStatus(null), 8000);
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"/>
              <span className="text-white text-lg font-semibold">
                {jobToEdit ? "Updating your job..." : "Posting your job..."}
              </span>
            </div>
          </div>
        </div>
      )}

      <JobPostComponent
        onSubmit={submitJobDetails}
        initialData={getInitialFormData()}
        isEditMode={!!jobToEdit}
      />
    </RecruiterLayout>
  );
};

export default JobPostPage;