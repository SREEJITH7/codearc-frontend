import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const COLORS = ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const AdminCharts = ({ metrics }) => {
  // Placeholder data if needed, but we prefer real or derived data
  const platformData = [
    { name: "Users", value: metrics?.total_users || 0 },
    { name: "Recruiters", value: metrics?.total_recruiters || 0 },
  ];

  const jobsAppsData = [
    { name: "Jobs", count: metrics?.total_jobs || 0 },
    { name: "Apps", count: metrics?.total_applications || 0 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: metrics?.total_revenue || 2780 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
          <p className="text-slate-400 text-xs font-medium uppercase mb-1">{label}</p>
          <p className="text-white text-lg font-bold">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
      {/* Platform Distribution Pie Chart */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-6">Platform Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Jobs vs Applications Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-6">Jobs vs Applications</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobsAppsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {jobsAppsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#06b6d4" : "#8b5cf6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Line Chart - Full Width Row */}
      <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-6">Revenue Growth</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#06b6d4" 
                strokeWidth={3} 
                dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4, stroke: "#0f172a" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
