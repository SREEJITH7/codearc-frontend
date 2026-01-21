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
} from "lucide-react";
import { validateJobPost } from "../../utils/validations/ValidateJobPost";
import { jobService } from "../../services/Job/jobService";

const JobPostComponent = ({
  onSubmit,
  initialData,
  isEditMode = false,
}) => {
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
  const [errors, setErrors] = useState([]);

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const locationInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      console.log("initialdata", initialData);
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchLocations = async () => {
      const query = formData.jobLocation.trim();

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
  };

  const handleLocationSelect = (location) => {
    const parts = location.display_name.split(",");
    const cleanLocation = parts.slice(0, 2).join(",").trim();

    setFormData((prev) => ({
      ...prev,
      jobLocation: cleanLocation,
    }));
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
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

    const { valid, errors } = validateJobPost(formData);

    if (!valid) {
      setErrors(errors);
      return;
    }

    setErrors([]);
    onSubmit(formData);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

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
        {errors.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-400 text-red-300">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

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

        <div className="bg-gradient-to-br from-slate-700/30 to-slate-600/20 backdrop-blur-md rounded-3xl p-8 border border-slate-600/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  Job Position Name
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
                />
              </div>

              {/* Work Mode */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Work Mode
                </label>
                <select
                  value={formData.workMode}
                  onChange={(e) => handleInputChange("workMode", e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                >
                  <option value="" disabled>Select Work Mode</option>
                  <option value="remote">Remote</option>
                  <option value="on-site">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Work Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-pink-400" />
                  Work Time
                </label>
                <select
                  value={formData.workTime}
                  onChange={(e) => handleInputChange("workTime", e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                >
                  <option value="" disabled>Select Work Time</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Location */}
              <div className="relative space-y-2" ref={locationInputRef}>
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
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
                  />
                  {isLoadingLocations && (
                    <Loader2 className="absolute right-3 top-3 w-5 h-5 text-blue-400 animate-spin" />
                  )}
                </div>

                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleLocationSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors text-slate-200 border-b border-slate-700 last:border-0"
                      >
                        {suggestion.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-2">
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
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                />
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Min Salary (LPA)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minSalary}
                    onChange={(e) => handleInputChange("minSalary", e.target.value)}
                    placeholder="Min"
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Max Salary (LPA)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxSalary}
                    onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                    placeholder="Max"
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                  />
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="space-y-4 pt-4">
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
                  className="flex-1 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="bg-blue-600 hover:bg-blue-500 px-6 rounded-xl transition-colors flex items-center justify-center font-bold"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
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
            <div className="space-y-4">
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
                  className="flex-1 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                />
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="bg-purple-600 hover:bg-purple-500 px-6 rounded-xl transition-colors flex items-center justify-center font-bold"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
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
