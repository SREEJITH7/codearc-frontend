import React, { useState, useEffect } from "react";
import { 
  Users, Briefcase, FileText, CreditCard, TrendingUp, UserCheck, 
  RefreshCcw, AlertCircle 
} from "lucide-react";
import { adminService } from "../../../services/Admin/adminService";
import AdminStatCard from "../../../component/admin/AdminStatCard";
import AdminCharts from "../../../component/admin/AdminCharts";
import { toast } from "react-toastify";

import { AdminLayout } from "../../../layouts/AdminLayouts";

const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError("Failed to load dashboard metrics");
        toast.error("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6 animate-pulse">
          <div className="flex items-center justify-between mb-8">
            <div className="h-10 w-48 bg-slate-800 rounded-lg"></div>
            <div className="h-10 w-32 bg-slate-800 rounded-lg"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-slate-800/50 rounded-2xl border border-white/5"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="h-[400px] bg-slate-800/50 rounded-2xl border border-white/5"></div>
            <div className="h-[400px] bg-slate-800/50 rounded-2xl border border-white/5"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-400 max-w-md mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: metrics?.total_users || 0,
      icon: Users,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Recruiters",
      value: metrics?.total_recruiters || 0,
      icon: UserCheck,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Jobs Posted",
      value: metrics?.total_jobs || 0,
      icon: Briefcase,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Applications",
      value: metrics?.total_applications || 0,
      icon: FileText,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      title: "Subscriptions",
      value: metrics?.active_subscriptions || 0,
      icon: CreditCard,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Total Revenue",
      value: `$${(metrics?.total_revenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-blue-600 to-cyan-600"
    }
  ];

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">Platform overview and real-time metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Live Updates Enabled
            </span>
          </div>
        </div>

        {/* Row 1: Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((card, idx) => (
            <AdminStatCard key={idx} {...card} index={idx} />
          ))}
        </div>

        {/* Row 2: Charts */}
        <AdminCharts metrics={metrics} />

        {/* Row 3: Recent Activity (Placeholder) */}
        <div className="mt-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Platform Activity</h3>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 ring-2 ring-white/5">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">New recruiter account registered</p>
                    <p className="text-xs text-slate-500 mt-0.5">2 hours ago • TechCorp Inc.</p>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-400">
                  #TR-49{item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
