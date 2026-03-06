import React, { useState } from "react";
import { Mail, UploadCloud, X ,Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { userAuthService } from "../../services/userAuth";
import { toast } from "react-toastify";
import { validateProfile } from "../../utils/validation/profileValidation";

import LoadingOverlay from "../common/LoadingOverlay";

const ProfileEditModal = ({
  mode = "edit",
  userInfo,
  onClose,
  onProfileUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [github, setGithub] = useState(userInfo.github || "");
  const [linkedin, setLinkedin] = useState(userInfo.linkedin || "");
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [bio, setBio] = useState(userInfo.bio || "");
  const [skills, setSkills] = useState(userInfo.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  // New fields
  const [phone, setPhone] = useState(userInfo.phone || "");
  const [location, setLocation] = useState(userInfo.location || "");
  const [highestQualification, setHighestQualification] = useState(userInfo.highest_qualification || "");
  const [specialization, setSpecialization] = useState(userInfo.specialization || "");
  const [institution, setInstitution] = useState(userInfo.institution || "");
  const [graduationYear, setGraduationYear] = useState(userInfo.graduation_year || "");
  const [cgpa, setCgpa] = useState(userInfo.cgpa || "");
  const [totalExperience, setTotalExperience] = useState(userInfo.total_experience || "");
  const [currentCompany, setCurrentCompany] = useState(userInfo.current_company || "");

  const [existingResume, setExistingResume] = useState(
    userInfo?.resume || null
  );

  const PREDEFINED_SKILLS = [
    "Python",
    "Django",
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Redis",
    "AWS",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Git",
    "REST API",
    "GraphQL",
  ];

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    // Validate
    const profileData = {
      firstName, lastName, github, linkedin, phone, location,
      highestQualification, specialization, institution, graduationYear,
      cgpa, totalExperience, currentCompany, bio, skills
    };
    
    const validationErrors = validateProfile(profileData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    setErrors({});
    const formData = new FormData();

    // Display name
    formData.append("display_name", `${firstName} ${lastName}`.trim());

    // Bio
    if (bio?.trim()) {
      formData.append("bio", bio.trim());
    }

    // Skills (array → JSON string)
    if (Array.isArray(skills) && skills.length > 0) {
      formData.append("skills", JSON.stringify(skills));
    }

    // Links
    if (github?.trim()) formData.append("github", github.trim());
    if (linkedin?.trim()) formData.append("linkedin", linkedin.trim());

    // Profile image
    if (image instanceof File) {
      formData.append("profileImage", image);
    }

    // New profile fields
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("highest_qualification", highestQualification);
    formData.append("specialization", specialization);
    formData.append("institution", institution);
    formData.append("graduation_year", graduationYear);
    formData.append("cgpa", cgpa);
    formData.append("total_experience", totalExperience);
    formData.append("current_company", currentCompany);

    // Resume (ONLY new upload)
    if (resumeFile instanceof File) {
      formData.append("resume", resumeFile);
    }

    setLoading(true);

    try {
      const response = await userAuthService.updateProfile(
        userInfo._id,
        formData
      );

      if (response.success && response.profile) {
        toast.success("Profile updated successfully!");
        onProfileUpdate(response.profile);
        onClose();
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

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
            max-h-[90vh]
            overflow-y-auto
            bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90
            border border-slate-700/50
            rounded-3xl
            p-10
            text-white
            shadow-2xl
          "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center mb-10">
            {mode === "complete" ? "Complete Your Profile" : "Edit Profile"}
          </h2>

{/* MAIN GRID */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

  {/* LEFT COLUMN */}
  <div className="space-y-8">

    {/* PROFILE IMAGE */}
    <div className="flex justify-center">
      <label
        className="
          relative w-40 h-40 rounded-full
          bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500
          flex items-center justify-center
          cursor-pointer
          shadow-xl
          hover:scale-105 transition
          overflow-hidden
          group
        "
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : userInfo.profileImage ? (
          <img
            src={`http://localhost:8000${userInfo.profileImage}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <UploadCloud className="w-10 h-10 text-white" />
        )}

        {/* HOVER OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-black/50
            flex flex-col items-center justify-center
            text-white
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-xs">Change Photo</span>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>

    {/* RESUME */}
    {mode === "complete" && (
      <div>
        <label className="text-sm mb-2 block">Resume</label>

        <label
          className="
            flex flex-col items-center justify-center
            h-48 gap-3
            rounded-2xl
            border-2 border-dashed border-slate-600
            bg-slate-800/60
            cursor-pointer
            hover:border-cyan-400 hover:bg-slate-800
            transition
          "
        >
          <UploadCloud className="w-10 h-10 text-cyan-400" />

          <p className="text-sm text-gray-300 text-center px-4">
            {resumeFile ? (
              <span className="text-cyan-300">
                Selected: {resumeFile.name}
              </span>
            ) : existingResume ? (
              <>
                <span className="text-green-400 block">
                  Resume already uploaded
                </span>

                <a
                  href={`http://localhost:8000${existingResume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  View current resume
                </a>

                <span className="block text-gray-400 mt-1">
                  Click to replace resume
                </span>
              </>
            ) : (
              "Click to upload your resume"
            )}
          </p>

          <p className="text-xs text-gray-500">
            PDF / DOC / DOCX (Max 5MB)
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>
    )}
  </div>

  {/* RIGHT COLUMN */}
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.firstName ? 'border-red-500' : 'border-slate-600'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs ml-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-1">
                  <input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.lastName ? 'border-red-500' : 'border-slate-600'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs ml-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    placeholder="GitHub URL"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.github ? 'border-red-500' : 'border-slate-600'}`}
                  />
                  {errors.github && <p className="text-red-500 text-xs ml-1">{errors.github}</p>}
                </div>
                <div className="space-y-1">
                  <input
                    placeholder="LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.linkedin ? 'border-red-500' : 'border-slate-600'}`}
                  />
                  {errors.linkedin && <p className="text-red-500 text-xs ml-1">{errors.linkedin}</p>}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    placeholder="Phone / Contact No"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-600'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                </div>
                <div className="space-y-1">
                  <input
                    placeholder="Current Location (City, Country)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.location ? 'border-red-500' : 'border-slate-600'}`}
                  />
                  {errors.location && <p className="text-red-500 text-xs ml-1">{errors.location}</p>}
                </div>
              </div>

              {/* Education Details */}
              <div className="space-y-4 pt-4 border-t border-slate-700/50">
                <h3 className="text-lg font-semibold text-cyan-400">Education Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <select
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.highestQualification ? 'border-red-500' : 'border-slate-600'} text-gray-400`}
                    >
                      <option value="">Select Qualification</option>
                      <option value="Bachelors">Bachelor's Degree</option>
                      <option value="Masters">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                    {errors.highestQualification && <p className="text-red-500 text-xs ml-1">{errors.highestQualification}</p>}
                  </div>
                  <div className="space-y-1">
                    <input
                      placeholder="Institution / University"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.institution ? 'border-red-500' : 'border-slate-600'}`}
                    />
                    {errors.institution && <p className="text-red-500 text-xs ml-1">{errors.institution}</p>}
                  </div>
                  <div className="space-y-1">
                    <input
                      placeholder="Specialization (e.g. CS)"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.specialization ? 'border-red-500' : 'border-slate-600'}`}
                    />
                    {errors.specialization && <p className="text-red-500 text-xs ml-1">{errors.specialization}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input
                        placeholder="Graduation Year"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.graduationYear ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.graduationYear && <p className="text-red-500 text-xs ml-1">{errors.graduationYear}</p>}
                    </div>
                    <div className="space-y-1">
                      <input
                        placeholder="CGPA / %"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.cgpa ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.cgpa && <p className="text-red-500 text-xs ml-1">{errors.cgpa}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4 pt-4 border-t border-slate-700/50">
                <h3 className="text-lg font-semibold text-cyan-400">Work Experience</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input
                      placeholder="Total Experience (Years)"
                      value={totalExperience}
                      onChange={(e) => setTotalExperience(e.target.value)}
                      className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.totalExperience ? 'border-red-500' : 'border-slate-600'}`}
                    />
                    {errors.totalExperience && <p className="text-red-500 text-xs ml-1">{errors.totalExperience}</p>}
                  </div>
                  <div className="space-y-1">
                    <input
                      placeholder="Current/Last Company"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      className={`w-full p-3 rounded-lg bg-slate-800 border ${errors.currentCompany ? 'border-red-500' : 'border-slate-600'}`}
                    />
                    {errors.currentCompany && <p className="text-red-500 text-xs ml-1">{errors.currentCompany}</p>}
                  </div>
                </div>
              </div>

              {mode === "complete" && (
                <div className="grid grid-cols-1 gap-4">
                  {/* BIO */}
                  <textarea
                    rows={4}
                    placeholder="Short bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="
        w-full
        p-3
        rounded-lg
        bg-slate-800
        border border-slate-600
        focus:outline-none
        focus:ring-2 focus:ring-cyan-500
      "
                  />

                  {/* SKILLS */}
                  <div className="col-span-2">
                    <label className="text-sm text-white mb-2 block">
                      Skills
                    </label>

                    {/* Selected skills */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() =>
                              setSkills((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="text-cyan-400 hover:text-red-400"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Input */}
                    <input
                      type="text"
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && skillInput.trim()) {
                          e.preventDefault();

                          if (!skills.includes(skillInput.trim())) {
                            setSkills([...skills, skillInput.trim()]);
                          }
                          setSkillInput("");
                        }
                      }}
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-cyan-500"
                    />

                    {/* Suggestions */}
                    {skillInput && (
                      <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-slate-600 bg-slate-900">
                        {PREDEFINED_SKILLS.filter(
                          (skill) =>
                            skill
                              .toLowerCase()
                              .includes(skillInput.toLowerCase()) &&
                            !skills.includes(skill)
                        ).map((skill) => (
                          <div
                            key={skill}
                            onClick={() => {
                              setSkills([...skills, skill]);
                              setSkillInput("");
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-slate-700 text-sm text-gray-300"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 border border-slate-600">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">{userInfo?.email}</span>
              </div>
  </div>
</div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
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

export default ProfileEditModal;
