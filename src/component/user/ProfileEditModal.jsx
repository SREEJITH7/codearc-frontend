import React, { useState } from "react";
import { Mail, UploadCloud, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { userAuthService } from "../../services/userAuth";
import { toast } from "react-toastify";

import LoadingOverlay from "../common/LoadingOverlay";

const ProfileEditModal = ({
  mode = "edit",
  userInfo,
  onClose,
  onProfileUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [github, setGithub] = useState(userInfo.github || "");
  const [linkedin, setLinkedin] = useState(userInfo.linkedin || "");
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [bio, setBio] = useState(userInfo.bio || "");
  const [skills, setSkills] = useState(userInfo.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
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
              {/* PROFILE IMAGE (BIGGER) */}
              <div className="flex justify-center">
                <label
                  className="
                  relative w-40 h-40 rounded-full
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
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <UploadCloud className="w-10 h-10 text-white" />
                  )}

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

                    {/* TEXT */}
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

                    {/* FILE INPUT */}
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
                <input
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-3 rounded-lg bg-slate-800 border border-slate-600"
                />
                <input
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-3 rounded-lg bg-slate-800 border border-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="GitHub URL"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="p-3 rounded-lg bg-slate-800 border border-slate-600"
                />
                <input
                  placeholder="LinkedIn URL"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="p-3 rounded-lg bg-slate-800 border border-slate-600"
                />
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
