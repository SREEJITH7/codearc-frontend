import React, { useState } from "react";
import {
  Mail,
  Building,
  Calendar,
  Phone,
  FileBadge,
  CheckCircle2,
  XCircle,
  Timer,
  Ban,
  User,
  MapPin,
  Eye,
  X,
  Download,
  Building2,
  CalendarDays,
  Pencil,           // ← added for edit icon
} from "lucide-react";

const RecruiterDetails = ({ recruiterInfo, onEditClick }) => {   // ← added onEditClick prop
  const [showCertificate, setShowCertificate] = useState(false);

  // Status configuration
  const statusConfig = {
    Active: {
      color: "text-green-400",
      bgColor: "bg-green-500/10 border-green-500/20",
      label: "Active",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    InActive: {
      color: "text-gray-400",
      bgColor: "bg-gray-500/10 border-gray-500/20",
      label: "Inactive",
      icon: <Ban className="w-4 h-4" />,
    },
    pending: {
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10 border-yellow-500/20",
      label: "Pending Approval",
      icon: <Timer className="w-4 h-4" />,
    },
    reject: {
      color: "text-red-400",
      bgColor: "bg-red-500/10 border-red-500/20",
      label: "Rejected",
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  const currentStatus = statusConfig[recruiterInfo.status] || statusConfig.pending;
  console.log("edit button clicked",onEditClick)
  return (
    <>
      <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-xl overflow-hidden relative">
        {/* Edit Button - Top Right */}
        <button
          onClick={onEditClick}
          className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 
                     bg-indigo-600/20 hover:bg-indigo-600/40 
                     border border-indigo-500/40 
                     text-indigo-300 hover:text-indigo-200 
                     rounded-lg text-sm font-medium
                     transition-all duration-200 shadow-sm hover:shadow-md"
          title="Edit your profile"
        >
          <Pencil className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 border-b border-slate-700">
          <div className="flex flex-col items-center text-center">
            {/* PROFILE IMAGE */}
            <div className="relative mb-4">
              {recruiterInfo.profileImage ? (
                <img
                  src={`http://localhost:8000${recruiterInfo.profileImage}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-600 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  {recruiterInfo.username?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              {recruiterInfo.username || "Recruiter"}
            </h2>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${currentStatus.bgColor}`}
            >
              {currentStatus.icon}
              <span className={`text-sm font-medium ${currentStatus.color}`}>
                {currentStatus.label}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* PERSONAL INFO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              Personal Information
            </h3>

            <div className="grid gap-3">
              <InfoRow icon={<Mail />} label="Email" value={recruiterInfo.email} />

              {recruiterInfo.phone && (
                <InfoRow icon={<Phone />} label="Phone" value={recruiterInfo.phone} />
              )}

              {recruiterInfo.location && (
                <InfoRow icon={<MapPin />} label="Location" value={recruiterInfo.location} />
              )}
            </div>
          </div>

          {/* COMPANY INFO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              Company Information
            </h3>

            <InfoRow
              icon={<Building2 />}
              label="Company Name"
              value={recruiterInfo.companyName || "Not specified"}
            />

            {recruiterInfo.companyType && (
              <InfoRow
                icon={<Building />}
                label="Company Type"
                value={recruiterInfo.companyType}
              />
            )}

            {recruiterInfo.yearEstablished && (
              <InfoRow
                icon={<CalendarDays />}
                label="Year Established"
                value={recruiterInfo.yearEstablished}
              />
            )}

            {recruiterInfo.registrationCertificate && (
              <div className="p-3 bg-slate-700/40 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">
                    Registration Certificate
                  </span>
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/20 rounded-lg text-indigo-400 hover:bg-indigo-600/30 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACCOUNT INFO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              Account Information
            </h3>

            <p className="text-gray-300">
              Member since{" "}
              {recruiterInfo.createdAt
                ? new Date(recruiterInfo.createdAt).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {showCertificate && recruiterInfo.registrationCertificate && (
  <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
    <div className="bg-slate-900 rounded-2xl w-full max-w-5xl max-h-[90vh] border border-slate-700 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-slate-700">
        <h3 className="text-white font-semibold text-xl">
          Registration Certificate
        </h3>
        <button
          onClick={() => setShowCertificate(false)}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Body - Preview Only */}
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
        {recruiterInfo.registrationCertificate
          .toLowerCase()
          .match(/\.(jpg|jpeg|png|gif)$/i) ? (
          // Image preview
          <img
            src={`http://localhost:8000${recruiterInfo.registrationCertificate}`}
            alt="Registration Certificate"
            className="max-w-full max-h-[65vh] object-contain rounded-lg border border-slate-600 shadow-xl"
          />
        ) : (
          // Non-image (PDF, DOC etc.)
          <div className="text-center py-12 px-6">
            <FileBadge className="w-20 h-20 mx-auto text-indigo-400 mb-6 opacity-80" />
            <h4 className="text-xl text-gray-200 mb-3">
              Document Certificate
            </h4>
            <p className="text-gray-400 max-w-md">
              This is your uploaded registration certificate (PDF/DOC format). If you want to change just update from profile !  
              <br />
              <span className="text-gray-500 text-sm mt-2 block">
                Preview is available only for image formats. You already have the original file.
              </span>
            </p>
          </div>
        )}

        {/* Small info footer */}
        <p className="text-gray-500 text-sm mt-8">
          This is the copy we have on record for verification purposes.
        </p>
      </div>
    </div>
  </div>
)}

      
    </>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 bg-slate-700/40 rounded-lg">
    <div className="text-indigo-400 mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-gray-200 font-medium break-words">{value}</p>
    </div>
  </div>
);

export default RecruiterDetails;