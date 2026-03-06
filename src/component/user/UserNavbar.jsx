import React, { useState, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Layers, Menu, X, Crown, Lock, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import NotificationDropdown from "../../features/notifications/NotificationDropdown";

const SubscriptionModal = lazy(() => import("./SubscriptionModal"));

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { path: "/user/profile", label: "Profile", active: true },
    { path: "/user/home", label: "Problems", active: true },
    { path: "/user/ai-tutor", label: "AI Tutor", active: true },
    // { path: "/user/community", label: "Community", active: false },
    { path: "/user/jobdetails", label: "Jobs", active: true },
    // { path: "/user/interview", label: "Interview", active: false },
  ];

  const { conversations } = useSelector((state) => state.chat);
  const totalUnread = conversations.reduce((acc, conv) => acc + (conv.unread_count || 0), 0);

  return (
    <>
      <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/user/home" className="flex items-center gap-2">
            <Layers className="w-7 h-7 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CodeArc
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.active ? item.path : "#"}
                  className={`flex items-center gap-1.5 transition-all duration-200 font-medium pb-1 border-b-2 ${
                    isActive
                      ? "text-white border-blue-500"
                      : item.active
                      ? "text-gray-300 hover:text-white border-transparent hover:border-blue-400/50"
                      : "text-gray-500 cursor-not-allowed border-transparent opacity-60 hover:opacity-100"
                  }`}
                  title={item.active ? "" : "Coming Soon"}
                >
                  {item.label}
                  {!item.active && (
                    <Lock className="w-3 h-3 text-slate-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">

            <Link to="/user/chat" className="relative group p-2 rounded-lg hover:bg-slate-700/50 transition-colors" title="Messages">
              <MessageSquare className="w-5 h-5 text-gray-300 group-hover:text-white cursor-pointer transition-colors" />
              {totalUnread > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center border-2 border-slate-800">
                  {totalUnread}
                </span>
              )}
            </Link>

            <NotificationDropdown />

            {/* ✅ Fixed Profile Icon - Now clickable */}
            <button 
              onClick={() => navigate("/user/profile")}
              className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              title="Go to Profile"
            >
              <User className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </button>

            {/* Desktop Premium Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              <span>Premium</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
            <nav className="flex flex-col items-start px-6 py-4 space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.active ? item.path : "#"}
                    onClick={() => item.active && setIsMenuOpen(false)}
                    className={`w-full flex items-center justify-between transition-colors font-medium pb-1 border-b-2 ${
                      isActive
                        ? "text-white border-blue-500"
                        : item.active
                        ? "text-gray-300 hover:text-white border-transparent hover:border-blue-400/50"
                        : "text-gray-500 cursor-not-allowed border-transparent opacity-60"
                    }`}
                    title={item.active ? "" : "Coming Soon"}
                  >
                    <div className="flex items-center">
                      {item.label}
                    </div>
                    {!item.active && (
                      <Lock className="w-3.5 h-3.5 text-yellow-500/80" />
                    )}
                  </Link>
                );
              })}
              
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30"
              >
                <Crown className="w-5 h-5" />
                <span>Premium</span>
              </button>
            </nav>
          </div>
        )}
      </div>
      <Suspense fallback={null}>
        <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
};

export default UserNavbar;