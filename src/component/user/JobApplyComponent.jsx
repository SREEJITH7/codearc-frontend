import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Link as LinkIcon, 
  FileText, 
  Plus, 
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from "lucide-react";
import { 
  validateStep1, 
  validateStep2, 
  validateStep3, 
  validateStep4 
} from "../../utils/validation/jobValidation";

const JobApplyComponent = ({ onSubmitApplication }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    location: "",
    highestQualification: "",
    qualificationName: "",
    institutionName: "",
    yearOfGraduation: "",
    cgpa: "",
    totalExperience: "",
    previousJobTitles: "",
    companyNames: "",
    githubProfile: "",
    linkedinProfile: "",
    personalWebsite: "",
    aboutYourself: "",
    skills: [],
    resume: null,
    plusTwoCertificate: null,
    degreeCertificate: null,
    pgCertificate: null,
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
      if (errors.skills) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const step4Errors = validateStep4(formData);
    if (Object.keys(step4Errors).length > 0) {
      setErrors(step4Errors);
      return;
    }
    onSubmitApplication(formData);
  };

  const nextStep = () => {
    let stepErrors = {};
    if (step === 1) stepErrors = validateStep1(formData);
    else if (step === 2) stepErrors = validateStep2(formData);
    else if (step === 3) stepErrors = validateStep3(formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setErrors({});
    setStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 gap-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            step === s 
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110" 
              : step > s 
              ? "bg-green-500 text-white" 
              : "bg-slate-700 text-slate-400"
          }`}>
            {step > s ? <CheckCircle2 size={20} /> : s}
          </div>
          {s < 4 && (
            <div className={`w-12 h-1 mx-2 rounded-full ${
              step > s ? "bg-green-500" : "bg-slate-700"
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/50 p-8 shadow-2xl">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Join Our Team</h2>
        <p className="text-slate-400 text-center mb-10">Please fill out the form below to submit your application.</p>
        
        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <User className="text-blue-400" size={20} /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.contactNo ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="+91 1234567890"
                  />
                  {errors.contactNo && <p className="text-red-500 text-xs mt-1 ml-1">{errors.contactNo}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Current Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.location ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="City, Country"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1 ml-1">{errors.location}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <GraduationCap className="text-yellow-400" size={20} /> Education Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Highest Qualification</label>
                  <select
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.highestQualification ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  >
                    <option value="">Select Qualification</option>
                    <option value="Bachelors">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                  {errors.highestQualification && <p className="text-red-500 text-xs mt-1 ml-1">{errors.highestQualification}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Specialization</label>
                  <input
                    type="text"
                    name="qualificationName"
                    value={formData.qualificationName}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.qualificationName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="e.g. Computer Science"
                  />
                  {errors.qualificationName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.qualificationName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Institution</label>
                  <input
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.institutionName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="e.g. University of Technology"
                  />
                  {errors.institutionName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.institutionName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Graduation Year</label>
                  <input
                    type="text"
                    name="yearOfGraduation"
                    value={formData.yearOfGraduation}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.yearOfGraduation ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="2024"
                  />
                  {errors.yearOfGraduation && <p className="text-red-500 text-xs mt-1 ml-1">{errors.yearOfGraduation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CGPA / Percentage</label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900/50 border ${errors.cgpa ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'} text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="8.5 or 85%"
                  />
                  {errors.cgpa && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cgpa}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Briefcase className="text-green-400" size={20} /> Work Experience & Skills
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Total Experience (Years)</label>
                    <input
                      type="text"
                      name="totalExperience"
                      value={formData.totalExperience}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g. 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current/Last Company</label>
                    <input
                      type="text"
                      name="companyNames"
                      value={formData.companyNames}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Skills</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill(e)}
                      className="flex-1 bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Add a skill (e.g. React)"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)}>
                          <X size={14} className="hover:text-red-400" />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.skills && <p className="text-red-500 text-xs mt-1 ml-1">{errors.skills}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tell us about yourself</label>
                  <textarea
                    name="aboutYourself"
                    rows="4"
                    value={formData.aboutYourself}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    placeholder="Write a brief cover letter..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <FileText className="text-purple-400" size={20} /> Documents & Portfolio
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Resume (PDF)</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label 
                      htmlFor="resume-upload"
                      className={`flex items-center justify-center gap-2 w-full bg-slate-900/50 border-2 border-dashed ${errors.resume ? 'border-red-500' : 'border-slate-700 hover:border-blue-500'} text-slate-400 hover:text-blue-400 rounded-xl px-4 py-6 cursor-pointer transition-all`}
                    >
                      <FileText size={20} />
                      <span>{formData.resume ? formData.resume.name : "Upload Resume"}</span>
                    </label>
                  </div>
                  {errors.resume && <p className="text-red-500 text-xs mt-1 ml-1">{errors.resume}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Degree Certificate</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="degreeCertificate"
                      accept=".pdf,.jpg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="degree-upload"
                    />
                    <label 
                      htmlFor="degree-upload"
                      className="flex items-center justify-center gap-2 w-full bg-slate-900/50 border-2 border-dashed border-slate-700 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-xl px-4 py-6 cursor-pointer transition-all"
                    >
                      <Plus size={20} />
                      <span>{formData.degreeCertificate ? formData.degreeCertificate.name : "Upload Certificate"}</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-700/50">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <LinkIcon size={16} className="text-blue-400" /> Links & Portfolios
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="url"
                      name="githubProfile"
                      value={formData.githubProfile}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="GitHub URL"
                    />
                    <input
                      type="url"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-8 border-t border-slate-700/50">
            <button
              type="button"
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                step === 1 ? "invisible" : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
              >
                Next <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />
    </div>
  );
};

export default JobApplyComponent;
