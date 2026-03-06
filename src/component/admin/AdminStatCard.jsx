import React from "react";
import { motion } from "framer-motion";

const AdminStatCard = ({ title, value, icon: Icon, gradient, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className={`relative group overflow-hidden rounded-2xl border border-white/10 p-6 shadow-xl 
                  bg-slate-900/40 backdrop-blur-xl transition-all duration-300`}
    >
      {/* Background Gradient Glow */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} 
                    opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h3>
        </div>

        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-black/20`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
      </div>

      <div className="mt-4 flex items-center text-xs font-medium">
        <span className="text-emerald-400 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5V10a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 11.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L10 10.586l3.293-3.293H12z" clipRule="evenodd" />
          </svg>
          12% inc
        </span>
        <span className="text-slate-500 ml-2">from last month</span>
      </div>
    </motion.div>
  );
};

export default AdminStatCard;
