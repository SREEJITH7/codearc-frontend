import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  MapPin,
  DollarSign,
  Users,
  Code,
  Clock,
  X,
  Loader2,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { validateJobPost } from "../../utils/validations/ValidateJobPost";
import { jobService } from "../../services/Job/jobService";

const FieldError = ({ message }) => {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5 animate-in fade-in slide-in-from-top-1">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
};

const inputBase =
  "w-full bg-slate-800/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all text-white placeholder:text-slate-500";
const inputNormal = `${inputBase} border border-slate-600 focus:ring-blue-500/50`;
const inputError = `${inputBase} border border-red-500/70 focus:ring-red-500/40 bg-red-500/5`;

const JobPostComponent = ({ onSubmit, initialData, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    role: "",
    workTime: "",
    workMode: "",
    jobLocation: "",
    minExperience: "",
    minSalary: "",
    maxSalary: "",
    requirements: [],
    responsibilities: [],
  });

  const [newRequirement, setNewRequirement] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [errors, setErrors] = useState({});

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const locationInputRef = useRef(null);
  const skipLocationFetchRef = useRef(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchLocations = async () => {
      const query = formData.jobLocation.trim();

      if (skipLocationFetchRef.current) {
        skipLocationFetchRef.current = false;
        return;
      }

      if (query.length < 3) {
        setLocationSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoadingLocations(true);

      try {
        const response = await jobService.fetchLocationSuggestions(query);

        if (response.data && response.data.success) {
          setLocationSuggestions(response.data.data || []);
          setShowSuggestions(response.data.data.length > 0);
        } else {
          setLocationSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocationSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocations, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData.jobLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Also clear salary error if either salary changes
    if (field === "minSalary" || field === "maxSalary") {
      if (errors.salary) setErrors((prev) => ({ ...prev, salary: undefined }));
    }
  };

  const handleLocationSelect = (location) => {
    const parts = location.display_name.split(",");
    const cleanLocation = parts.slice(0, 2).join(",").trim();

    skipLocationFetchRef.current = true;
    setFormData((prev) => ({
      ...prev,
      jobLocation: cleanLocation,
    }));
    setShowSuggestions(false);
    setLocationSuggestions([]);
    if (errors.jobLocation) {
      setErrors((prev) => ({ ...prev, jobLocation: undefined }));
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
      if (errors.requirements) {
        setErrors((prev) => ({ ...prev, requirements: undefined }));
      }
    }
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [
          ...prev.responsibilities,
          newResponsibility.trim(),
        ],
      }));
      setNewResponsibility("");
      if (errors.responsibilities) {
        setErrors((prev) => ({ ...prev, responsibilities: undefined }));
      }
    }
  };

  const removeResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { valid, errors: validationErrors } = validateJobPost(formData);

    if (!valid) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  const errorCount = Object.keys(errors).filter(k => errors[k]).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isEditMode ? "Update" : "Post a New"}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tech Position
            </span>
          </h1>
        </div>

        {/* Top-level error summary */}
        {errorCount > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 font-medium text-sm">
                Please fix {errorCount} {errorCount === 1 ? "error" : "errors"} before submitting.
              </p>
              <p className="text-red-400/70 text-xs mt-0.5">
                Fields marked in red below need your attention.
              </p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-700/30 to-slate-600/20 backdrop-blur-md rounded-3xl p-8 border border-slate-600/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Role */}
              <div id="field-role" className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  Job Position Name
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className={errors.role ? inputError : inputNormal}
                />
                <FieldError message={errors.role} />
              </div>

              {/* Work Mode */}
              <div id="field-workMode" className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Work Mode
                </label>
                <select
                  value={formData.workMode}
                  onChange={(e) => handleInputChange("workMode", e.target.value)}
                  className={errors.workMode ? inputError : inputNormal}
                >
                  <option value="" disabled>Select Work Mode</option>
                  <option value="remote">REMOTE</option>
                  <option value="on-site">ONSITE</option>
                  <option value="hybrid">HYBRID</option>

                </select>
                <FieldError message={errors.workMode} />
              </div>

              {/* Work Time */}
              <div id="field-workTime" className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-pink-400" />
                  Work Time
                </label>
                <select
                  value={formData.workTime}
                  onChange={(e) => handleInputChange("workTime", e.target.value)}
                  className={errors.workTime ? inputError : inputNormal}
                >
                  <option value="" disabled>Select Work Time</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="internship">Internship</option>
                </select>
                <FieldError message={errors.workTime} />
              </div>

              {/* Location */}
              <div id="field-jobLocation" className="relative space-y-2" ref={locationInputRef}>
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.jobLocation}
                    onChange={(e) => handleInputChange("jobLocation", e.target.value)}
                    placeholder="Search for a city..."
                    className={errors.jobLocation ? inputError : inputNormal}
                  />
                  {isLoadingLocations && (
                    <Loader2 className="absolute right-3 top-3.5 w-5 h-5 text-blue-400 animate-spin" />
                  )}
                </div>
                <FieldError message={errors.jobLocation} />

                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleLocationSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors text-slate-200 border-b border-slate-700 last:border-0 text-sm"
                      >
                        {suggestion.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div id="field-minExperience" className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  Minimum Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minExperience}
                  onChange={(e) => handleInputChange("minExperience", e.target.value)}
                  placeholder="e.g. 3"
                  className={errors.minExperience ? inputError : inputNormal}
                />
                <FieldError message={errors.minExperience} />
              </div>

              {/* Salary Range */}
              <div id="field-salary" className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Salary Range (LPA)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    min="0"
                    value={formData.minSalary}
                    onChange={(e) => handleInputChange("minSalary", e.target.value)}
                    placeholder="Min"
                    className={errors.salary ? inputError : inputNormal}
                  />
                  <input
                    type="number"
                    min="0"
                    value={formData.maxSalary}
                    onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                    placeholder="Max"
                    className={errors.salary ? inputError : inputNormal}
                  />
                </div>
                <FieldError message={errors.salary} />
              </div>
            </div>

            {/* Requirements Section */}
            <div id="field-requirements" className="space-y-4 pt-4">
              <label className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-700 pb-2">
                <Code className="w-5 h-5 text-indigo-400" />
                Technical Requirements
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addRequirement)}
                  placeholder="e.g. 3+ years experience in React"
                  className={errors.requirements && formData.requirements.length === 0 ? inputError : inputNormal}
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="bg-blue-600 hover:bg-blue-500 px-6 rounded-xl transition-colors flex items-center justify-center font-bold"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <FieldError message={errors.requirements} />
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {formData.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-slate-700/50 border border-slate-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-1"
                  >
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities Section */}
            <div id="field-responsibilities" className="space-y-4">
              <label className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-700 pb-2">
                <Users className="w-5 h-5 text-orange-400" />
                Key Responsibilities
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addResponsibility)}
                  placeholder="e.g. Mentoring junior developers"
                  className={errors.responsibilities && formData.responsibilities.length === 0 ? inputError : inputNormal}
                />
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="bg-purple-600 hover:bg-purple-500 px-6 rounded-xl transition-colors flex items-center justify-center font-bold"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <FieldError message={errors.responsibilities} />
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {formData.responsibilities.map((resp, index) => (
                  <span
                    key={index}
                    className="bg-slate-700/50 border border-slate-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-1"
                  >
                    {resp}
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* General Errors */}
            <FieldError message={errors.general} />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/20 transition-all transform active:scale-[0.98] mt-8"
            >
              {isEditMode ? "Update Job Posting" : "Publish Job Posting"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostComponent;