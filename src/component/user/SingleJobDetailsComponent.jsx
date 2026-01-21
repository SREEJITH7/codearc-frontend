import React from "react";
import { MapPin, Briefcase, Clock, DollarSign, Users } from "lucide-react";

const SingleJobDetailsComponent = ({ job }) => {
  if (!job) return null;

  return (
    <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/50 p-8 mb-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-3">{job.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300">
              <Briefcase className="w-5 h-5 text-green-400" />
              <span className="capitalize">{job.job_type?.toLowerCase()}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>{job.experience} years exp</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:w-64 bg-slate-800/60 rounded-xl p-6 border border-slate-600/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className="font-semibold text-green-400">{job.status}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-600/50">
            <p className="text-xs text-gray-400 mb-1">Posted on</p>
            <p className="text-sm text-white">
              {new Date(job.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetailsComponent;
