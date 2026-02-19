// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Mail, Phone, Briefcase, ChevronLeft, CheckCircle,
//   XCircle, Clock, Star, Trophy, BookOpen, Percent, Send,
//   MapPin, GraduationCap, Lightbulb, FileText, Award,
//   Building2, Info, AlertCircle, ExternalLink, Github, Linkedin, Globe
// } from "lucide-react";
// import { toast } from "react-toastify";
// import RecruiterLayout from "../../../layouts/RecruiterLayout";
// import { applicationService } from "../../../services/ApplicationService";

// /* ── colour tokens ───────────────────────────────────────── */
// const colorMap = {
//   blue:    { pill: "bg-blue-500/15 border-blue-500/30 text-blue-300",       btn: "bg-blue-600/20 hover:bg-blue-600/35 border-blue-500/40 text-blue-300" },
//   red:     { pill: "bg-red-500/15 border-red-500/30 text-red-300",           btn: "bg-red-600/20 hover:bg-red-600/35 border-red-500/40 text-red-300" },
//   emerald: { pill: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300", btn: "bg-emerald-600/20 hover:bg-emerald-600/35 border-emerald-500/40 text-emerald-300" },
//   amber:   { pill: "bg-amber-500/15 border-amber-500/30 text-amber-300",    btn: "" },
// };

// const STATUS_CONFIG = {
//   pending:     { color: "amber",   icon: <Clock size={12}/>,        label: "Pending" },
//   shortlisted: { color: "blue",    icon: <Star size={12}/>,         label: "Shortlisted" },
//   rejected:    { color: "red",     icon: <XCircle size={12}/>,      label: "Rejected" },
//   accepted:    { color: "emerald", icon: <CheckCircle size={12}/>,  label: "Accepted" },
// };

// /* ── sub-components ──────────────────────────────────────── */
// const SectionCard = ({ icon, title, children }) => (
//   <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
//     <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
//       {icon}{title}
//     </h3>
//     {children}
//   </div>
// );

// const EmptyState = ({ text }) => (
//   <div className="flex items-center gap-2 text-slate-600 text-sm py-1">
//     <AlertCircle size={13}/>{text}
//   </div>
// );

// const ActionButton = ({ onClick, disabled, color, icon, label }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border
//       transition-all shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${colorMap[color]?.btn}`}
//   >
//     {icon}{label}
//   </button>
// );

// const Chip = ({ icon, text, highlight = false }) => (
//   <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
//     ${highlight
//       ? "bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 shadow-indigo-500/10"
//       : "bg-slate-900/60 border border-slate-700/50 text-slate-400"}`}>
//     {icon}{text}
//   </span>
// );

// const CertificateItem = ({ label, url }) => (
//   <div className="flex items-center justify-between p-3.5 bg-slate-900/40 border border-slate-700/40 rounded-xl hover:bg-slate-900/60 transition-colors group">
//     <div className="flex items-center gap-3">
//       <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
//         <Award size={14} className="text-amber-400" />
//       </div>
//       <span className="text-slate-300 text-xs font-medium">{label}</span>
//     </div>
//     <a href={`http://localhost:8000${url}`} target="_blank" rel="noopener noreferrer"
//       className="text-[10px] uppercase tracking-wider font-bold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 transition-all">
//       View
//     </a>
//   </div>
// );

// /* ── page ────────────────────────────────────────────────── */
// const ApplicantProfilePage = () => {
//   const { applicationId } = useParams();
//   const navigate           = useNavigate();
//   const [applicant, setApplicant] = useState(null);
//   const [loading,   setLoading]   = useState(true);
//   const [updating,  setUpdating]  = useState(false);

//   useEffect(() => { fetchApplicantDetails(); }, [applicationId]);

//   const fetchApplicantDetails = async () => {
//     try {
//       setLoading(true);
//       const res = await applicationService.getApplicantDetails(applicationId);
//       if (res?.success) setApplicant(res.data.application);
//       else toast.error("Failed to fetch applicant details");
//     } catch { toast.error("An error occurred while fetching details"); }
//     finally  { setLoading(false); }
//   };

//   const handleStatusUpdate = async (newStatus) => {
//     try {
//       setUpdating(true);
//       const res = await applicationService.updateApplicationStatus(applicationId, newStatus);
//       if (res?.success) {
//         toast.success(newStatus === "shortlisted" ? "Applicant shortlisted!" : `Application ${newStatus}`);
//         setApplicant(prev => ({ ...prev, status: newStatus.toUpperCase() }));
//       } else toast.error(res?.message || "Failed to update status");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     } finally { setUpdating(false); }
//   };

//   if (loading) return (
//     <RecruiterLayout>
//       <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
//         <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin"/>
//         <p className="text-slate-400 text-sm font-medium tracking-wide">Loading Applicant Profile…</p>
//       </div>
//     </RecruiterLayout>
//   );

//   if (!applicant) return (
//     <RecruiterLayout>
//       <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
//         <AlertCircle className="w-12 h-12 text-slate-700"/>
//         <p className="text-slate-500 font-medium">Applicant not found</p>
//         <button onClick={() => navigate("/recruiter/applicants")}
//           className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:text-white transition-all">
//           Back to Applicants
//         </button>
//       </div>
//     </RecruiterLayout>
//   );

//   const info         = applicant.applicant || {};
//   const profile      = applicant.profile   || {};
//   const stats        = applicant.codingStats || {};
//   const job          = applicant.job        || {};
//   const links        = applicant.links      || {};
//   const certificates = applicant.certificates || {};
//   const statusKey    = applicant.status?.toLowerCase();
//   const cfg          = STATUS_CONFIG[statusKey] || { color: "amber", icon: null, label: applicant.status };

//   return (
//     <RecruiterLayout>
//       <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
//         <div className="max-w-7xl mx-auto px-6 pt-8">

//           {/* breadcrumb */}
//           <button onClick={() => navigate("/recruiter/applicants")}
//             className="flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-6 group transition-colors px-1">
//             <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
//             <span className="font-medium">Back to All Applicants</span>
//           </button>

//           {/* HERO PROFILE */}
//           <div className="relative bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
//             <div className="h-44 bg-gradient-to-r from-indigo-900 via-slate-800 to-violet-900 relative">
//               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"/>
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/80"/>
//             </div>

//             <div className="px-10 pb-8">
//               <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6">
//                 <div className="relative flex-shrink-0 group">
//                   <div className="w-40 h-40 rounded-3xl border-[6px] border-slate-900 shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
//                     {info.profileImage ? (
//                       <img src={`http://localhost:8000${info.profileImage}`} alt={info.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
//                     ) : (
//                       <span className="text-7xl font-black text-white/90 drop-shadow-lg">
//                         {info.name?.charAt(0)?.toUpperCase()}
//                       </span>
//                     )}
//                   </div>
//                   <div className={`absolute -bottom-2 -right-2 flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-tighter border shadow-xl ${colorMap[cfg.color]?.pill}`}>
//                     {cfg.icon}{cfg.label}
//                   </div>
//                 </div>

//                 <div className="flex-1 pb-1">
//                   <div className="flex flex-wrap items-center gap-3 mb-1">
//                     <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{info.name || "N/A"}</h1>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-4">
//                     <p className="text-slate-400 text-sm flex items-center gap-1.5">
//                       <Mail size={14} className="text-indigo-400 opacity-70"/> {info.email}
//                     </p>
//                     {links.githubProfile && (
//                       <a href={links.githubProfile} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
//                         <Github size={16}/>
//                       </a>
//                     )}
//                     {links.linkedinProfile && (
//                       <a href={links.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors">
//                         <Linkedin size={16}/>
//                       </a>
//                     )}
//                     {links.personalWebsite && (
//                       <a href={links.personalWebsite} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors">
//                         <Globe size={16}/>
//                       </a>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     {info.contactNo && <Chip icon={<Phone size={12}/>} text={info.contactNo}/>}
//                     {info.location && <Chip icon={<MapPin size={12}/>} text={info.location}/>}
//                     <Chip icon={<Briefcase size={12}/>} text={job.title || "Position N/A"} highlight/>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
//             {/* LEFT COLUMN */}
//             <div className="lg:col-span-2 space-y-8">

//               {/* CODING STATS */}
//               <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-7 shadow-xl">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
//                     <Trophy size={14} className="text-amber-500"/> Coding stats
//                   </h3>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {[
//                     { label: "Global Rank",  value: stats.rank ? `#${stats.rank}` : "—", color: "text-blue-400",   icon: <Star size={18}/> },
//                     { label: "Total Score",  value: stats.score ?? 0,              color: "text-amber-400",  icon: <Trophy size={18}/> },
//                     { label: "Solved",       value: stats.totalSolved ?? 0,        color: "text-emerald-400",icon: <BookOpen size={18}/> },
//                     { label: "Acceptance",  value: `${stats.acceptanceRate ?? 0}%`,color: "text-violet-400", icon: <Percent size={18}/> },
//                   ].map((s) => (
//                     <div key={s.label} className="bg-[#0f172a]/80 border border-slate-700/40 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
//                       <div className="flex justify-between items-start mb-3">
//                          <div className={`${s.color} opacity-40 group-hover:opacity-100 transition-opacity`}>{s.icon}</div>
//                       </div>
//                       <p className={`text-2xl font-black ${s.color} mb-1 tracking-tight`}>{s.value}</p>
//                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ABOUT */}
//               <SectionCard icon={<Info size={14} className="text-indigo-400"/>} title="About Applicant">
//                 {profile.about ? (
//                   <p className="text-slate-300 text-sm leading-relaxed font-normal whitespace-pre-wrap italic opacity-90">
//                     "{profile.about}"
//                   </p>
//                 ) : <EmptyState text="No bio provided"/>}
//               </SectionCard>

//               {/* SKILLS */}
//               <SectionCard icon={<Lightbulb size={14} className="text-emerald-400"/>} title="Technical Arsenal">
//                 {profile.skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2.5">
//                     {profile.skills.map((s, i) => (
//                       <span key={i} className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/20 text-indigo-300 rounded-xl text-xs font-bold hover:bg-indigo-500/10 transition-colors">
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                 ) : <EmptyState text="No specific skills highlighted"/>}
//               </SectionCard>

//               {/* EDUCATION & EXPERIENCE */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <SectionCard icon={<GraduationCap size={14} className="text-violet-400"/>} title="Academic Background">
//                   {profile.education?.highestQualification ? (
//                     <div className="bg-[#0f172a]/60 border border-slate-700/30 rounded-2xl p-5 relative overflow-hidden">
//                        <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 transition-transform group-hover:scale-110">
//                          <GraduationCap size={80}/>
//                        </div>
//                        <h4 className="text-white font-bold text-sm mb-1">{profile.education.qualificationName}</h4>
//                        <p className="text-indigo-400 text-xs font-semibold mb-3">{profile.education.institutionName}</p>
//                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 border-t border-slate-700/50 pt-3">
//                          <span>Graduated: {profile.education.yearOfGraduation}</span>
//                          <span className="text-emerald-400">Score: {profile.education.cgpa}</span>
//                        </div>
//                     </div>
//                   ) : <EmptyState text="Education profile is empty"/>}
//                 </SectionCard>

//                 <SectionCard icon={<Building2 size={14} className="text-orange-400"/>} title="Professional History">
//                    {profile.experience?.companyNames ? (
//                     <div className="bg-[#0f172a]/60 border border-slate-700/30 rounded-2xl p-5">
//                        <h4 className="text-white font-bold text-sm mb-1">{profile.experience.previousJobTitles || "Role N/A"}</h4>
//                        <p className="text-orange-400 text-xs font-semibold mb-3">{profile.experience.companyNames}</p>
//                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 border-t border-slate-700/50 pt-3">
//                          <span>Experience: {profile.experience.totalExperience} Years</span>
//                        </div>
//                     </div>
//                   ) : <EmptyState text="No experience recorded"/>}
//                 </SectionCard>
//               </div>

//             </div>

//             {/* RIGHT COLUMN */}
//             <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">

//               {/* ACTIONS */}
//               <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-7 shadow-2xl">
//                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Decision Center</h3>
//                 <div className="space-y-3">
//                   {applicant.status === "PENDING" && (
//                     <>
//                       <ActionButton onClick={() => handleStatusUpdate("shortlisted")} disabled={updating}
//                         color="blue" icon={<Star size={16}/>} label="Shortlist Profile"/>
//                       <ActionButton onClick={() => handleStatusUpdate("rejected")} disabled={updating}
//                         color="red" icon={<XCircle size={16}/>} label="Decline Application"/>
//                     </>
//                   )}
//                   {applicant.status === "SHORTLISTED" && (
//                     <>
//                       <ActionButton
//                         onClick={() => navigate(`/recruiter/applicants-details/${applicationId}/send-offer`)}
//                         disabled={updating} color="emerald" icon={<Send size={16}/>} label="Generate Offer"/>
//                       <ActionButton onClick={() => handleStatusUpdate("rejected")} disabled={updating}
//                         color="red" icon={<XCircle size={16}/>} label="Decline Application"/>
//                     </>
//                   )}
//                   {applicant.status === "ACCEPTED" && (
//                     <div className="flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold shadow-emerald-500/5">
//                       <CheckCircle size={18}/> Offer Accepted
//                     </div>
//                   )}
//                   {applicant.status === "REJECTED" && (
//                     <div className="flex items-center justify-center gap-2 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold shadow-red-500/5">
//                       <XCircle size={18}/> Profile Declined
//                     </div>
//                   )}
//                   {updating && (
//                     <div className="flex justify-center pt-2">
//                        <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"/>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* DOCUMENTS */}
//               <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-7 shadow-2xl">
//                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Vault</h3>
//                 <div className="space-y-3">
//                    <div className="flex items-center justify-between p-3.5 bg-slate-900/40 border border-slate-700/40 rounded-xl hover:bg-slate-900/60 transition-colors group">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
//                         <FileText size={14} className="text-indigo-400" />
//                       </div>
//                       <span className="text-slate-300 text-xs font-medium">Resume</span>
//                     </div>
//                     {applicant.resume ? (
//                       <a href={`http://localhost:8000${applicant.resume}`} target="_blank" rel="noopener noreferrer"
//                         className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 transition-all">
//                         View
//                       </a>
//                     ) : <span className="text-[10px] text-slate-600 font-bold italic mr-2">No file</span>}
//                   </div>

//                   {certificates.plusTwo && <CertificateItem label="+2 Certificate" url={certificates.plusTwo} />}
//                   {certificates.degree && <CertificateItem label="Degree" url={certificates.degree} />}
//                   {certificates.pg && <CertificateItem label="PG" url={certificates.pg} />}
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </RecruiterLayout>
//   );
// };

// export default ApplicantProfilePage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail, Phone, Briefcase, ChevronLeft, CheckCircle,
  XCircle, Clock, Star, Trophy, BookOpen, Percent, Send,
  MapPin, GraduationCap, Lightbulb, FileText, Award,
  Building2, Info, AlertCircle, Github, Linkedin, Globe
} from "lucide-react";
import { toast } from "react-toastify";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import { applicationService } from "../../../services/ApplicationService";

const colorMap = {
  blue:    { pill: "bg-blue-500/15 border-blue-500/30 text-blue-300",         btn: "bg-blue-600/20 hover:bg-blue-600/35 border-blue-500/40 text-blue-300" },
  red:     { pill: "bg-red-500/15 border-red-500/30 text-red-300",             btn: "bg-red-600/20 hover:bg-red-600/35 border-red-500/40 text-red-300" },
  emerald: { pill: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300", btn: "bg-emerald-600/20 hover:bg-emerald-600/35 border-emerald-500/40 text-emerald-300" },
  amber:   { pill: "bg-amber-500/15 border-amber-500/30 text-amber-300",      btn: "" },
};

const STATUS_CONFIG = {
  pending:     { color: "amber",   icon: <Clock size={13}/>,       label: "Pending" },
  shortlisted: { color: "blue",    icon: <Star size={13}/>,        label: "Shortlisted" },
  rejected:    { color: "red",     icon: <XCircle size={13}/>,     label: "Rejected" },
  accepted:    { color: "emerald", icon: <CheckCircle size={13}/>, label: "Accepted" },
};

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 shadow-xl">
    <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
      {icon}{title}
    </h3>
    {children}
  </div>
);

const EmptyState = ({ text }) => (
  <div className="flex items-center gap-2 text-slate-600 text-sm py-1">
    <AlertCircle size={13}/>{text}
  </div>
);

const ActionButton = ({ onClick, disabled, color, icon, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border
      transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${colorMap[color]?.btn}`}
  >
    {icon}{label}
  </button>
);

const Chip = ({ icon, text, highlight = false }) => (
  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
    ${highlight
      ? "bg-indigo-500/15 border border-indigo-500/25 text-indigo-300"
      : "bg-slate-900/60 border border-slate-700/50 text-slate-400"}`}>
    {icon}{text}
  </span>
);

const CertificateItem = ({ label, url }) => (
  <div className="flex items-center justify-between p-3.5 bg-slate-900/40 border border-slate-700/40 rounded-xl hover:bg-slate-900/60 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Award size={14} className="text-amber-400"/>
      </div>
      <span className="text-slate-300 text-sm font-medium">{label}</span>
    </div>
    <a href={`http://localhost:8000${url}`} target="_blank" rel="noopener noreferrer"
      className="text-xs font-bold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 transition-all uppercase tracking-wider">
      View
    </a>
  </div>
);

/* ─── main page ─────────────────────────────────────────── */
const ApplicantProfilePage = () => {
  const { applicationId } = useParams();
  const navigate          = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [updating,  setUpdating]  = useState(false);

  useEffect(() => { fetchApplicantDetails(); }, [applicationId]);

  const fetchApplicantDetails = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getApplicantDetails(applicationId);
      if (res?.success) setApplicant(res.data.application);
      else toast.error("Failed to fetch applicant details");
    } catch { toast.error("An error occurred while fetching details"); }
    finally  { setLoading(false); }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await applicationService.updateApplicationStatus(applicationId, newStatus);
      if (res?.success) {
        toast.success(newStatus === "shortlisted" ? "Applicant shortlisted!" : `Application ${newStatus}`);
        setApplicant(prev => ({ ...prev, status: newStatus.toUpperCase() }));
      } else toast.error(res?.message || "Failed to update status");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally { setUpdating(false); }
  };

  if (loading) return (
    <RecruiterLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin"/>
        <p className="text-slate-400 text-sm font-medium">Loading Applicant Profile…</p>
      </div>
    </RecruiterLayout>
  );

  if (!applicant) return (
    <RecruiterLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-slate-700"/>
        <p className="text-slate-500 font-medium text-lg">Applicant not found</p>
        <button onClick={() => navigate("/recruiter/applicants")}
          className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all">
          Back to Applicants
        </button>
      </div>
    </RecruiterLayout>
  );

  const info         = applicant.applicant  || {};
  const profile      = applicant.profile    || {};
  const stats        = applicant.codingStats || {};
  const job          = applicant.job         || {};
  const links        = applicant.links       || {};
  const certificates = applicant.certificates || {};
  const statusKey    = applicant.status?.toLowerCase();
  const cfg          = STATUS_CONFIG[statusKey] || { color: "amber", icon: null, label: applicant.status };

  return (
    <RecruiterLayout>
      <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-8">

          {/* back */}
          <button onClick={() => navigate("/recruiter/applicants")}
            className="flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-6 group transition-colors">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="font-medium">Back to All Applicants</span>
          </button>

          {/* ══════════════════════════════════════════
              HERO  —  banner + avatar side by side,
              name BELOW the avatar row so no overlap
          ══════════════════════════════════════════ */}
          <div className="relative bg-slate-800/40 border border-slate-700/50 rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
            
            {/* banner — purely decorative, no text inside */}
            <div className="h-44 bg-gradient-to-r from-indigo-900 via-slate-800 to-violet-900 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/90"/>
              <div className="absolute -right-16 -top-16 w-72 h-72 border border-white/5 rounded-full pointer-events-none"/>
              <div className="absolute -right-4  -top-4  w-52 h-52 border border-white/5 rounded-full pointer-events-none"/>
            </div>

            {/* content below banner — avatar overlaps banner bottom only */}
            <div className="px-8 pt-0 pb-8">
              {/* Avatar row — pulled up with -mt to overlap banner */}
              <div className="flex items-end gap-5 -mt-14 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="w-36 h-36 rounded-3xl border-[5px] border-[#0f172a] shadow-2xl
                    bg-gradient-to-br from-indigo-500 to-purple-600
                    flex items-center justify-center overflow-hidden">
                    {info.profileImage ? (
                      <img src={`http://localhost:8000${info.profileImage}`} alt={info.name}
                        className="w-full h-full object-cover"/>
                    ) : (
                      <span className="text-6xl font-black text-white/90">
                        {info.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                  {/* status badge */}
                  <div className={`absolute -bottom-2 -right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-xl
                    text-xs font-bold border shadow-xl ${colorMap[cfg.color]?.pill}`}>
                    {cfg.icon}{cfg.label}
                  </div>
                </div>

                {/* social links sit beside the avatar at the bottom of the banner area */}
                <div className="pb-2 flex items-center gap-3">
                  {links.githubProfile && (
                    <a href={links.githubProfile} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-700/60 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-400 transition-all">
                      <Github size={15}/>
                    </a>
                  )}
                  {links.linkedinProfile && (
                    <a href={links.linkedinProfile} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-700/60 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                      <Linkedin size={15}/>
                    </a>
                  )}
                  {links.personalWebsite && (
                    <a href={links.personalWebsite} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-700/60 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all">
                      <Globe size={15}/>
                    </a>
                  )}
                </div>
              </div>

              {/* Name + meta — fully BELOW the overlap zone, never obscured */}
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
                {info.name || "N/A"}
              </h1>
              <p className="text-slate-400 text-base mb-4 flex items-center gap-2">
                <Mail size={15} className="text-indigo-400/70"/>
                {info.email}
              </p>

              <div className="flex flex-wrap gap-2">
                {info.contactNo  && <Chip icon={<Phone size={12}/>}    text={info.contactNo}/>}
                {info.location   && <Chip icon={<MapPin size={12}/>}   text={info.location}/>}
                <Chip icon={<Briefcase size={12}/>} text={job.title || "Position N/A"} highlight/>
                <Chip icon={<Clock size={12}/>}
                  text={`Applied ${new Date(applicant.created_at).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"})}`}/>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              MAIN GRID  2 + 1
          ══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN — priority order */}
            <div className="lg:col-span-2 space-y-6">

              {/* ① CODING STATS */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 shadow-xl">
                <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
                  <Trophy size={14} className="text-amber-500"/>Coding Performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Global Rank",  value: stats.rank ? `#${stats.rank}` : "—",  color: "text-blue-400",    icon: <Star size={20}/> },
                    { label: "Total Score",  value: stats.score ?? 0,                      color: "text-amber-400",   icon: <Trophy size={20}/> },
                    { label: "Solved",       value: stats.totalSolved ?? 0,                color: "text-emerald-400", icon: <BookOpen size={20}/> },
                    { label: "Acceptance",   value: `${stats.acceptanceRate ?? 0}%`,       color: "text-violet-400",  icon: <Percent size={20}/> },
                  ].map((s) => (
                    <div key={s.label}
                      className="bg-[#0f172a]/70 border border-slate-700/40 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group cursor-default">
                      <div className={`mb-3 ${s.color} opacity-50 group-hover:opacity-100 transition-opacity`}>{s.icon}</div>
                      <p className={`text-3xl font-black tracking-tight mb-1 ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ② SKILLS */}
              <SectionCard icon={<Lightbulb size={14} className="text-emerald-400"/>} title="Technical Skills">
                {profile.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {profile.skills.map((s, i) => (
                      <span key={i}
                        className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl text-sm font-semibold hover:bg-indigo-500/15 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : <EmptyState text="No skills listed"/>}
              </SectionCard>

              {/* ③ EDUCATION + EXPERIENCE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SectionCard icon={<GraduationCap size={14} className="text-violet-400"/>} title="Education">
                  {profile.education?.highestQualification ? (
                    <div className="bg-[#0f172a]/60 border border-slate-700/30 rounded-2xl p-5">
                      <h4 className="text-white font-bold text-base mb-1">{profile.education.qualificationName}</h4>
                      <p className="text-indigo-400 text-sm font-semibold mb-3">{profile.education.institutionName}</p>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 border-t border-slate-700/50 pt-3">
                        <span>Graduated: {profile.education.yearOfGraduation}</span>
                        <span className="text-emerald-400">CGPA: {profile.education.cgpa}</span>
                      </div>
                    </div>
                  ) : <EmptyState text="Education profile is empty"/>}
                </SectionCard>

                <SectionCard icon={<Building2 size={14} className="text-orange-400"/>} title="Experience">
                  {profile.experience?.companyNames ? (
                    <div className="bg-[#0f172a]/60 border border-slate-700/30 rounded-2xl p-5">
                      <h4 className="text-white font-bold text-base mb-1">{profile.experience.previousJobTitles || "Role N/A"}</h4>
                      <p className="text-orange-400 text-sm font-semibold mb-3">{profile.experience.companyNames}</p>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500 border-t border-slate-700/50 pt-3">
                        {profile.experience.totalExperience} Years Experience
                      </div>
                    </div>
                  ) : <EmptyState text="No experience recorded"/>}
                </SectionCard>
              </div>

              {/* ④ ABOUT */}
              <SectionCard icon={<Info size={14} className="text-indigo-400"/>} title="About">
                {profile.about ? (
                  <p className="text-slate-300 text-base leading-relaxed">"{profile.about}"</p>
                ) : <EmptyState text="No bio provided"/>}
              </SectionCard>
            </div>

            {/* RIGHT SIDEBAR — sticky */}
            <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">

              {/* ACTIONS */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">Actions</h3>
                <div className="space-y-3">
                  {applicant.status === "PENDING" && (
                    <>
                      <ActionButton onClick={() => handleStatusUpdate("shortlisted")} disabled={updating}
                        color="blue" icon={<Star size={16}/>} label="Shortlist Profile"/>
                      <ActionButton onClick={() => handleStatusUpdate("rejected")} disabled={updating}
                        color="red" icon={<XCircle size={16}/>} label="Decline Application"/>
                    </>
                  )}
                  {applicant.status === "SHORTLISTED" && (
                    <>
                      <ActionButton
                        onClick={() => navigate(`/recruiter/applicants-details/${applicationId}/send-offer`)}
                        disabled={updating} color="emerald" icon={<Send size={16}/>} label="Send Offer"/>
                      <ActionButton onClick={() => handleStatusUpdate("rejected")} disabled={updating}
                        color="red" icon={<XCircle size={16}/>} label="Decline Application"/>
                    </>
                  )}
                  {applicant.status === "ACCEPTED" && (
                    <div className="flex items-center justify-center gap-2 py-4 rounded-xl
                      bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-base font-bold">
                      <CheckCircle size={18}/>Offer Accepted
                    </div>
                  )}
                  {applicant.status === "REJECTED" && (
                    <div className="flex items-center justify-center gap-2 py-4 rounded-xl
                      bg-red-500/10 border border-red-500/20 text-red-400 text-base font-bold">
                      <XCircle size={18}/>Application Rejected
                    </div>
                  )}
                  {updating && (
                    <div className="flex justify-center pt-1">
                      <div className="w-5 h-5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"/>
                    </div>
                  )}
                </div>
              </div>

              {/* DOCUMENTS */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">Documents</h3>
                <div className="space-y-3">
                  {/* Resume */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/40 border border-slate-700/40 rounded-xl hover:bg-slate-900/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <FileText size={14} className="text-indigo-400"/>
                      </div>
                      <span className="text-slate-300 text-sm font-medium">Resume</span>
                    </div>
                    {applicant.resume ? (
                      <a href={`http://localhost:8000${applicant.resume}`} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 transition-all uppercase tracking-wider">
                        View
                      </a>
                    ) : <span className="text-xs text-slate-600 italic">Not uploaded</span>}
                  </div>

                  {/* Certificates */}
                  {certificates.plusTwo && <CertificateItem label="+2 Certificate" url={certificates.plusTwo}/>}
                  {certificates.degree  && <CertificateItem label="Degree Certificate" url={certificates.degree}/>}
                  {certificates.pg      && <CertificateItem label="PG Certificate" url={certificates.pg}/>}

                  {!applicant.resume && !certificates.plusTwo && !certificates.degree && !certificates.pg && (
                    <EmptyState text="No documents uploaded"/>
                  )}
                </div>
              </div>

              {/* CONTACT */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">Contact</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Mail size={14}/>,  text: info.email       || "—" },
                    { icon: <Phone size={14}/>, text: info.contactNo   || "Not provided" },
                    { icon: <MapPin size={14}/>,text: info.location    || "Not provided" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="text-slate-600 flex-shrink-0">{icon}</span>
                      <span className="truncate">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default ApplicantProfilePage;