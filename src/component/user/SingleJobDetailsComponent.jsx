import React from "react";
import { MapPin, Briefcase, Clock, DollarSign, ListChecks, Calendar } from "lucide-react";

const SingleJobDetailsComponent = ({ job }) => {
  if (!job) return null;

  // Format responsibilities if they are JSON or a list
  const responsibilities = Array.isArray(job.responsibilities) 
    ? job.responsibilities 
    : typeof job.responsibilities === 'string' 
      ? JSON.parse(job.responsibilities || '[]') 
      : [];

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 mb-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Section: Core Details */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">{job.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{job.job_type?.toLowerCase()}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                <Clock className="w-4 h-4" />
                <span>{job.experience}Y+ Experience</span>
              </div>

              {job.workTime && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
                   <Calendar className="w-4 h-4" />
                   <span className="capitalize">{job.workTime.replace('-', ' ')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-700/50">
            {/* Tech Stack and Responsibilities Area */}
            <div className="space-y-8">
              {job.skills && job.skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Required Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {responsibilities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ListChecks className="text-blue-400 w-5 h-5" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-400 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Salary & Other Info */}
            <div className="space-y-6">
              <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Compensation</h3>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      ₹{job.minSalary?.toLocaleString()} - ₹{job.maxSalary?.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Per Annum (Expected)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetailsComponent;
