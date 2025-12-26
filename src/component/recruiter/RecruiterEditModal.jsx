import React, { useState } from "react";
import { Building2, Phone, MapPin, User, UploadCloud, X ,CalendarDays} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import these from your services
import { toast } from "react-toastify";
import { recruiterAuthService } from "../../services/RecruiterAuth";

import LoadingOverlay from "../common/LoadingOverlay";

const RecruiterProfileEditModal = ({ profile, onClose, onProfileUpdate }) => {
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState(profile.company_name || "");
  const [companyType, setCompanyType] = useState(profile.company_type || "");
  const [contactPerson, setContactPerson] = useState(profile.contact_person || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [location, setLocation] = useState(profile.location || "");
  const [yearEstablished, setYearEstablished] = useState(profile.year_established || "");
  const [image, setImage] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [existingCertificate, setExistingCertificate] = useState(
    profile?.registration_certificate || null
  );

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

const handleSave = async () => {
  const formData = new FormData();

  // Only append if value exists and is different from original
  if (companyName && companyName !== profile.company_name) {
    formData.append("company_name", companyName);
  }
  if (companyType && companyType !== profile.company_type) {
    formData.append("company_type", companyType);
  }
  if (contactPerson && contactPerson !== profile.contact_person) {
    formData.append("contact_person", contactPerson);
  }
  if (phone && phone !== profile.phone) {
    formData.append("phone", phone);
  }
  if (location && location !== profile.location) {
    formData.append("location", location);
  }
  if (yearEstablished && yearEstablished !== profile.year_established) {
    formData.append("year_established", yearEstablished);
  }

  // Files are always sent if selected (they can't be "unchanged")
  if (image) formData.append("profileimage", image);
  if (certificate) formData.append("registration_certificate", certificate);

  // If nothing changed → don't send request
  if (formData.entries().next().done) {
    toast.info("No changes detected");
    onClose();
    return;
  }

  setLoading(true);

  try {
    const res = await recruiterAuthService.updateProfile(formData);

    if (res.success) {
      toast.success("Profile updated successfully");
      onProfileUpdate(res.data);
      onClose();
    } else {
      toast.error(res.message || "Update failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // Generate years from 1900 to current year (2025 as per context)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <>
      {loading && (
        <LoadingOverlay message="Updating profile, please wait..." />
      )}
      
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
        />

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.3 }}
            className="
              relative
              w-full max-w-6xl
              bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90
              border border-slate-700/50
              rounded-3xl
              p-6 lg:p-10
              text-white
              shadow-2xl
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* TITLE */}
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-10">
              Edit Recruiter Profile
            </h2>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* LEFT COLUMN */}
              <div className="space-y-6 lg:space-y-8">
                {/* COMPANY LOGO */}
                <div className="flex justify-center">
                  <label
                    className="
                      relative w-32 h-32 lg:w-40 lg:h-40 rounded-full
                      bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500
                      flex items-center justify-center
                      cursor-pointer
                      shadow-xl
                      hover:scale-105 transition
                    "
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Company Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : profile?.profileimage ? (
                      <img
                        src={profile.profileimage}
                        alt="Company Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>

                {/* REGISTRATION CERTIFICATE */}
                <div>
                  <label className="text-sm mb-2 block">Registration Certificate</label>

                  <label
                    className="
                      flex flex-col items-center justify-center
                      h-40 lg:h-48 gap-3
                      rounded-2xl
                      border-2 border-dashed border-slate-600
                      bg-slate-800/60
                      cursor-pointer
                      hover:border-cyan-400 hover:bg-slate-800
                      transition
                    "
                  >
                    <UploadCloud className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-400" />

                    <p className="text-sm text-gray-300 text-center px-4">
                      {certificate ? (
                        <span className="text-cyan-300">
                          Selected: {certificate.name}
                        </span>
                      ) : existingCertificate ? (
                        <>
                          <span className="text-green-400 block">
                            Certificate already uploaded
                          </span>
                          {profile.year_established && (
                            <span className="text-gray-300 block mt-1">
                              Year Established: {profile.year_established}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`http://localhost:8000${existingCertificate}`, '_blank');
                            }}
                            className="text-cyan-400 underline text-sm mt-2"
                          >
                            Open Certificate
                          </button>
                          <span className="block text-gray-400 mt-1">
                            Click to replace certificate
                          </span>
                        </>
                      ) : (
                        "Click to upload registration certificate"
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      PDF / DOC / DOCX (Max 5MB)
                    </p>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCertificate(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4 lg:space-y-6">
                {/* COMPANY NAME & TYPE */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 border border-slate-600 focus-within:ring-2 focus-within:ring-cyan-500">
                    <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <input
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                  </div>

                  <input
                    placeholder="Company Type (e.g., IT Services, Healthcare)"
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="p-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                  />
                </div>

                {/* YEAR ESTABLISHED */}
                <div className="relative">
                  <select
                    value={yearEstablished}
                    onChange={(e) => setYearEstablished(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm appearance-none"
                  >
                    <option value="">Select Year Established</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-cyan-400">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                </div>

                {/* CONTACT PERSON */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 border border-slate-600 focus-within:ring-2 focus-within:ring-cyan-500">
                  <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <input
                    placeholder="Contact Person Name"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                {/* PHONE */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 border border-slate-600 focus-within:ring-2 focus-within:ring-cyan-500">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 border border-slate-600 focus-within:ring-2 focus-within:ring-cyan-500">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <input
                    placeholder="Company Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                {/* EMAIL (READ-ONLY) */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-sm">
                  <span className="text-xs text-gray-400">Email:</span>
                  <span className="text-sm">{profile?.email || "Not provided"}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-6 lg:mt-10">
              <button
                onClick={onClose}
                className="px-4 lg:px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 lg:px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 text-sm"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default RecruiterProfileEditModal;