import React from "react";
import { X } from "lucide-react";

const ApplicantDetailsModal = ({ isOpen, applicant, onClose }) => {
  if (!isOpen || !applicant) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-slate-800 text-white rounded-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Applicant Details</h2>

        <div className="space-y-3 text-sm">
          <p><b>Name:</b> {applicant.applicant_name}</p>
          <p><b>Email:</b> {applicant.email}</p>
          <p><b>Contact:</b> {applicant.contactNo}</p>
          <p><b>Job:</b> {applicant.job_title}</p>
          <p><b>Status:</b> {applicant.status}</p>
          <p><b>Applied On:</b> {new Date(applicant.created_at).toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsModal;
