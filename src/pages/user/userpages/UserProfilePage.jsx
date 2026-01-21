import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import {
  BarChart3,
  Trophy,
  Clock,
  Settings,
  Sparkles,
  Crown,
  Mail,
  Calendar,
  Award,
  UserRound,
} from "lucide-react";

import Cookies from "js-cookie";
import UserLayout from "../../../layouts/UserLayout";
import { userAuthService } from "../../../services/userAuth";
import ProfileEditModal from "../../../component/user/ProfileEditModal";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/authSlice";
import { logoutThunk } from "../../../store/authThunks";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [userInfo, setUserInfo] = useState({
    _id: "",
    username: "",
    email: "",
    createdAt: "",
    role: "user",
  });

  const [userStats, setUserStats] = useState(null);

  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileModalMode, setProfileModalMode] = useState("edit");

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Basic info = name exists
  const hasBasicInfo = Boolean(
    userInfo.display_name?.trim() || userInfo.username?.trim()
  );

  // Resume uploaded
  const hasResume = Boolean(userInfo.resume);

  // Skills added
  const hasSkills =
    Array.isArray(userInfo.skills) && userInfo.skills.length > 0;

  // Bio added
  const hasBio = Boolean(userInfo.bio?.trim());

  // Profile image uploaded
  const hasProfileImage = Boolean(userInfo.profileImage);

  // All checks (easy to extend later)
  const profileChecks = [
    hasBasicInfo,
    hasProfileImage,
    hasResume,
    hasSkills,
    hasBio,
  ];

  // Completion %
  const completedCount = profileChecks.filter(Boolean).length;
  const completionPercent = Math.round(
    (completedCount / profileChecks.length) * 100
  );

  // const handleLogout = async () => {
  //   try {
  //     const res = await userAuthService.logout();

  //     if (res.success) {
  //       dispatch(clearUser());
  //       toast.success(res.message);
  //       navigate("/user/login", { replace: true });
  //     } else {
  //       toast.error(res.message || "Logout failed");
  //     }
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //     toast.error("Something went wrong during logout");
  //   }
  // };
  const handleLogout = async () => {
  try {
    const result = await dispatch(logoutThunk("user")).unwrap();
    toast.success(result.message || "Logged out successfully");
    navigate("/user/login", { replace: true });
  } catch (err) {
    console.error("Logout error:", err);
    toast.error(err || "Something went wrong during logout");
  }
};

  /* ---------------------------------------------------------
     FIX 1: AUTO CLOSE POPUP & REMOVE OVERLAY ON PAGE EXIT
  ---------------------------------------------------------- */

  useEffect(() => {
    let timer;

    if (location.state?.showSubscriptionSuccess) {
      setShowSuccessPopup(true);

      timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 4000);

      window.history.replaceState({}, document.title);
    }

    return () => {
      setShowSuccessPopup(false); // ALWAYS REMOVE OVERLAY WHEN LEAVING PAGE
      clearTimeout(timer);
    };
  }, [location]);

  /* ---------------------------------------------------------
     FIX 2: FETCH PROFILE & STATS
  ---------------------------------------------------------- */
  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      const profileData = await userAuthService.getUserProfile();
      setUserInfo(profileData.data);

      const statsData = await userAuthService.getUserStats();
      setUserStats(statsData.data);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.log("ERROR:", error?.response?.status, error?.response?.data);

      if (
        error?.response?.status === 403 &&
        errorMessage === "Invalid role to perform this action"
      ) {
        toast.error("Unauthorized access. Redirecting to login.");
        navigate("/user/login");
      } else {
        toast.error("Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  /* ---------------------------------------------------------
     HELPERS
  ---------------------------------------------------------- */
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "Hard":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-300 bg-gray-500/10";
    }
  };
  const ProgressBar = ({ percent }) => (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );

  const StatusRow = ({ label, done }) => (
    <div className="flex items-center justify-between">
      <span className="text-gray-300 text-sm">{label}</span>
      <span
        className={`text-sm font-bold ${
          done ? "text-green-400" : "text-yellow-400"
        }`}
      >
        {done ? "✓" : "!"}
      </span>
    </div>
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  };

  /* ---------------------------------------------------------
     FIX 3: SAFE POPUP COMPONENT (NO SCREEN BLOCKING)
  ---------------------------------------------------------- */
  const PremiumSuccessPopup = () => {
    if (!showSuccessPopup) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-slate-800 border border-blue-500/30 rounded-3xl p-8 max-w-md w-full">
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
              <Crown className="text-white w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold text-white mt-4">
              Welcome to Premium 🎉
            </h2>

            <p className="text-gray-300 mt-2">
              Your subscription is successfully activated.
            </p>
          </div>
        </div>
      </div>
    );
  };

  /* ---------------------------------------------------------
     RETURN UI
  ---------------------------------------------------------- */

  return (
    <UserLayout>
      <PremiumSuccessPopup />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 py-2">
        {/* ------------------- SIDEBAR -------------------- */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-slate-800/60 rounded-3xl p-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                  {userInfo.profileImage ? (
                    <img
                      src={`http://localhost:8000${userInfo.profileImage}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                      {userInfo.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                  {userInfo.username?.charAt(0).toUpperCase()}
                </div> */}

                <h2 className="text-2xl text-white font-bold text-center mt-4">
                  {userInfo.display_name?.trim() || userInfo.username}
                </h2>

                <div className="space-y-3 mt-6 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <UserRound className="w-4 h-4 text-cyan-400" />{" "}
                    {userInfo.username}
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" /> {userInfo.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Joined {formatDate(userInfo.createdAt)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" /> {userInfo.role}
                  </p>
                </div>

                <button
                  // onClick={() => navigate("/user/profile/edit")}
                  onClick={() => {
                    setProfileModalMode("complete");
                    setIsProfileModalOpen(true);
                  }}
                  className="w-full mt-6 bg-blue-500/20 border border-blue-500/40 text-blue-400 py-2 rounded-lg"
                >
                  <Settings className="inline w-4 h-4 mr-2" /> Edit Profile
                </button>
              </>
            )}
          </div>

          <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                Profile Completion
              </h3>
              <span className="text-cyan-400 font-semibold">
                {completionPercent}%
              </span>
            </div>

            {/* PROGRESS BAR */}
            <ProgressBar percent={completionPercent} />

            {/* STATUS LIST */}
            <div className="space-y-3 mt-4">
              <StatusRow label="Basic Info" done={hasBasicInfo} />
              <StatusRow label="Profile Image" done={hasProfileImage} />
              <StatusRow label="Resume" done={hasResume} />
              <StatusRow label="Skills" done={hasSkills} />
              <StatusRow label="Bio" done={hasBio} />
            </div>

            {/* CTA */}
            {completionPercent < 100 && (
              <button
                onClick={() => {
                  setProfileModalMode("complete");
                  setIsProfileModalOpen(true);
                }}
                className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 font-semibold py-2 px-4 rounded-lg transition-all text-sm"
              >
                Complete Profile
              </button>
            )}
          </div>

          <button
            // onClick={() => navigate("/user/login")}
            onClick={handleLogout}
            className="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>

        {/* ------------------- MAIN CONTENT -------------------- */}
        <div className="xl:col-span-3 space-y-8">
          {/* STATS */}
          <div className="bg-slate-800/60 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" /> Statistics
            </h3>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-slate-700 animate-pulse rounded-xl"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatBlock
                  title="Solved"
                  value={userStats?.solvedProblems || 0}
                  color="cyan"
                />
                <StatBlock
                  title="Easy"
                  value={userStats?.easyCount || 0}
                  color="green"
                />
                <StatBlock
                  title="Medium"
                  value={userStats?.mediumCount || 0}
                  color="yellow"
                />
                <StatBlock
                  title="Hard"
                  value={userStats?.hardCount || 0}
                  color="red"
                />
              </div>
            )}
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-slate-800/60 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <Clock className="w-6 h-6 text-cyan-400" /> Recent Activity
            </h3>

            <div className="space-y-4">
              {!loading && userStats?.recentSubmissions?.length > 0 ? (
                userStats.recentSubmissions.map((submission, i) => (
                  <div
                    key={i}
                    className="p-6 bg-slate-700/30 rounded-2xl flex justify-between"
                  >
                    <div>
                      <p className="text-white font-semibold">
                        {submission.problemTitle}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatRelativeTime(submission.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(
                        submission.difficulty
                      )}`}
                    >
                      {submission.difficulty}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isProfileModalOpen && (
        <ProfileEditModal
          mode={profileModalMode}
          userInfo={userInfo}
          onClose={() => setIsProfileModalOpen(false)}
          onProfileUpdate={(updatedProfile) => {
            setUserInfo((prev) => ({ ...prev, ...updatedProfile }));
          }}
        />
      )}

  
    </UserLayout>
  );
};

export default UserProfilePage;

/* ---------------------------------------------------------
   Helper Component for Stats
---------------------------------------------------------- */
const StatBlock = ({ title, value, color }) => {
  return (
    <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/20">
      <p className={`text-4xl font-bold text-${color}-400 mb-2`}>{value}</p>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
};
