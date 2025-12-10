// // src/pages/user/userpages/UserProfilePage.jsx

// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { 
//   BarChart3, 
//   Trophy, 
//   Clock, 
//   Settings, 
//   Sparkles, 
//   Crown,
//   User,
//   Mail,
//   Calendar,
//   Award
// } from "lucide-react";
// import UserLayout from "../../../layouts/UserLayout";
// import { userAuthService } from "../../../services/userAuth";

// const UserProfilePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
//   const [userInfo, setUserInfo] = useState({
//     _id: "",
//     username: "",
//     email: "",
//     createdAt: "",
//     role: "user"
//   });

//   const [userStats, setUserStats] = useState(null);

//   // Check if coming from subscription success page
//   useEffect(() => {
//     if (location.state?.showSubscriptionSuccess) {
//       setShowSuccessPopup(true);
//       window.history.replaceState({}, document.title);
      
//       setTimeout(() => {
//         setShowSuccessPopup(false);
//       }, 5000);
//     }
//   }, [location]);

//   // Fetch user profile data
//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch profile data
//       const profileData = await userAuthService.getUserProfile();
//       setUserInfo(profileData.data);
//       console.log("userInfo:", profileData.data);

//       // Fetch stats data
//       const statsData = await userAuthService.getUserStats();
//       setUserStats(statsData.data);
//       console.log("statsData:", statsData.data);

//     } catch (error) {
//       console.error("Fetch error:", error);
      
//       const errorMessage = error?.response?.data?.message;
      
//       if (error?.response?.status === 403 && errorMessage === "Invalid role to perform this action") {
//         toast.error("Unauthorized access. Redirecting to login.");
//         navigate("/user/login");
//       } else {
//         toast.error("Failed to load profile. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "text-green-400 bg-green-400/10";
//       case "Medium":
//         return "text-yellow-400 bg-yellow-400/10";
//       case "Hard":
//         return "text-red-400 bg-red-400/10";
//       default:
//         return "text-gray-300 bg-gray-500/10";
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatRelativeTime = (dateString) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return "Just now";
//     if (diffInHours < 24) return `${diffInHours} hours ago`;
//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays === 1) return "1 day ago";
//     return `${diffInDays} days ago`;
//   };

//   // Check cookies
// console.log('All cookies:', document.cookie);

// // Try manual API call
// useEffect(() => {
//   console.log('All cookies:', document.cookie);

//   fetch('http://localhost:8000/api/auth/user/profile/', {
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(r => r.json())
//     .then(console.log)
//     .catch(console.error);
// }, []); // only once


//   return (
//     <UserLayout>
//       {/* Success Popup Modal */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
//           <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
//             <button
//               onClick={() => setShowSuccessPopup(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none">
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//             </div>

//             <div className="relative z-10">
//               <div className="flex justify-center mb-6">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
//                     <Crown className="w-12 h-12 text-white animate-bounce" />
//                   </div>
//                   <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
//                 </div>
//               </div>

//               <div className="text-center mb-6">
//                 <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   Welcome to Premium! 🎉
//                 </h2>
//                 <p className="text-gray-300 text-lg leading-relaxed">
//                   Your subscription has been successfully activated. Enjoy all premium features!
//                 </p>
//               </div>

//               <div className="bg-slate-900/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
//                 <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
//                   <Sparkles className="w-5 h-5 text-yellow-400" />
//                   <span>Premium Benefits Unlocked:</span>
//                 </h3>
//                 <ul className="space-y-3">
//                   {[
//                     "Unlimited problem submissions",
//                     "Advanced code analysis",
//                     "Priority support access",
//                     "Exclusive premium challenges"
//                   ].map((benefit, index) => (
//                     <li key={index} className="flex items-center space-x-3 text-gray-300">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <span>{benefit}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <button
//                 onClick={() => setShowSuccessPopup(false)}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/30"
//               >
//                 Start Exploring
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Profile Content */}
//       <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 px-6 py-10 max-w-7xl mx-auto">
//         {/* Sidebar - User Details */}
//         <div className="xl:col-span-1 space-y-6">
//           <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
//             {loading ? (
//               <div className="animate-pulse space-y-4">
//                 <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto"></div>
//                 <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
//                 <div className="h-3 bg-slate-700 rounded w-full"></div>
//               </div>
//             ) : (
//               <>
//                 <div className="flex justify-center mb-6">
//                   <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//                     {userInfo.username ? userInfo.username.charAt(0).toUpperCase() : "U"}
//                   </div>
//                 </div>
                
//                 <h2 className="text-2xl font-bold text-white text-center mb-2">
//                   {userInfo.username || "User"}
//                 </h2>
                
//                 <div className="space-y-3 mt-6">
//                   <div className="flex items-center space-x-3 text-gray-300">
//                     <Mail className="w-4 h-4 text-cyan-400" />
//                     <span className="text-sm truncate">{userInfo.email}</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-gray-300">
//                     <Calendar className="w-4 h-4 text-cyan-400" />
//                     <span className="text-sm">
//                       Joined {userInfo.createdAt ? formatDate(userInfo.createdAt) : "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-gray-300">
//                     <Award className="w-4 h-4 text-cyan-400" />
//                     <span className="text-sm capitalize">{userInfo.role || "user"}</span>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={() => navigate('/user/profile/edit')}
//                   className="w-full mt-6 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 font-semibold py-2 px-4 rounded-lg transition-all"
//                 >
//                   <Settings className="w-4 h-4 inline mr-2" />
//                   Edit Profile
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={() => {
//               // Add your logout logic here
//               navigate('/user/login');
//             }}
//             className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-semibold py-3 px-4 rounded-xl transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="xl:col-span-3 space-y-8">
//           {/* User Stats */}
//           <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
//             <h3 className="text-2xl font-semibold text-white mb-8 flex items-center space-x-2">
//               <BarChart3 className="w-6 h-6 text-cyan-400" />
//               <span>Statistics</span>
//             </h3>
            
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={i} className="animate-pulse">
//                     <div className="h-16 bg-slate-700 rounded-xl"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                   <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/20">
//                     <p className="text-4xl font-bold text-cyan-400 mb-2">
//                       {userStats?.solvedProblems || 0}
//                     </p>
//                     <p className="text-gray-400 text-sm">Problems Solved</p>
//                   </div>
                  
//                   <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/20">
//                     <p className="text-4xl font-bold text-green-400 mb-2">
//                       {userStats?.easyCount || 0}
//                     </p>
//                     <p className="text-gray-400 text-sm">Easy</p>
//                   </div>
                  
//                   <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/20">
//                     <p className="text-4xl font-bold text-yellow-400 mb-2">
//                       {userStats?.mediumCount || 0}
//                     </p>
//                     <p className="text-gray-400 text-sm">Medium</p>
//                   </div>
                  
//                   <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/20">
//                     <p className="text-4xl font-bold text-red-400 mb-2">
//                       {userStats?.hardCount || 0}
//                     </p>
//                     <p className="text-gray-400 text-sm">Hard</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-3xl font-bold text-orange-400">
//                           {userStats?.currentStreak || 0}
//                         </p>
//                         <p className="text-gray-400 text-sm mt-1">Current Streak</p>
//                       </div>
//                       <Trophy className="w-12 h-12 text-orange-400" />
//                     </div>
//                   </div>
                  
//                   <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-3xl font-bold text-purple-400">
//                           {userStats?.longestStreak || 0}
//                         </p>
//                         <p className="text-gray-400 text-sm mt-1">Longest Streak</p>
//                       </div>
//                       <Award className="w-12 h-12 text-purple-400" />
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
//             <h3 className="text-2xl font-semibold text-white mb-8 flex items-center space-x-2">
//               <Clock className="w-6 h-6 text-cyan-400" />
//               <span>Recent Activity</span>
//             </h3>
            
//             <div className="space-y-4">
//               {loading ? (
//                 [...Array(3)].map((_, i) => (
//                   <div key={i} className="animate-pulse p-6 bg-slate-700/30 rounded-2xl">
//                     <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
//                     <div className="h-3 bg-slate-600 rounded w-1/2"></div>
//                   </div>
//                 ))
//               ) : userStats?.recentSubmissions?.length > 0 ? (
//                 userStats.recentSubmissions.map((submission, index) => (
//                   <div
//                     key={submission.problemId || index}
//                     className="flex items-center justify-between p-6 bg-slate-700/30 hover:bg-slate-700/50 rounded-2xl transition-all hover:shadow-lg border border-slate-600/20"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
//                       <div>
//                         <p className="text-white font-semibold text-lg">
//                           {submission.problemTitle}
//                         </p>
//                         <div className="flex items-center space-x-3 mt-1">
//                           <p className="text-gray-400 text-sm">
//                             {formatRelativeTime(submission.createdAt)}
//                           </p>
//                           {submission.runtime && (
//                             <span className="text-gray-500 text-sm">
//                               • Runtime: {submission.runtime}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <span
//                         className={`text-sm font-semibold px-4 py-2 rounded-full ${getDifficultyColor(
//                           submission.difficulty
//                         )}`}
//                       >
//                         {submission.difficulty}
//                       </span>
//                       <span
//                         className={`text-sm font-semibold px-4 py-2 rounded-full ${
//                           submission.overallStatus === "passed"
//                             ? "text-emerald-400 bg-emerald-400/10"
//                             : "text-red-400 bg-red-400/10"
//                         }`}
//                       >
//                         {submission.overallStatus === "passed" ? "Solved" : "Failed"}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-12">
//                   <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                   <p className="text-gray-400 text-lg">No recent activity</p>
//                   <p className="text-gray-500 text-sm mt-2">
//                     Start solving problems to see your activity here
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default UserProfilePage;

// ---------------



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
  Award
} from "lucide-react";

import UserLayout from "../../../layouts/UserLayout";
import { userAuthService } from "../../../services/userAuth";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [userInfo, setUserInfo] = useState({
    _id: "",
    username: "",
    email: "",
    createdAt: "",
    role: "user"
  });

  const [userStats, setUserStats] = useState(null);

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

      if (error?.response?.status === 403 && errorMessage === "Invalid role to perform this action") {
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
      case "Easy": return "text-green-400 bg-green-400/10";
      case "Medium": return "text-yellow-400 bg-yellow-400/10";
      case "Hard": return "text-red-400 bg-red-400/10";
      default: return "text-gray-300 bg-gray-500/10";
    }
  };

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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 px-6 py-10 max-w-7xl mx-auto">

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
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                  {userInfo.username?.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-2xl text-white font-bold text-center mt-4">
                  {userInfo.username}
                </h2>

                <div className="space-y-3 mt-6 text-gray-300 text-sm">
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
                  onClick={() => navigate("/user/profile/edit")}
                  className="w-full mt-6 bg-blue-500/20 border border-blue-500/40 text-blue-400 py-2 rounded-lg"
                >
                  <Settings className="inline w-4 h-4 mr-2" /> Edit Profile
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => navigate("/user/login")}
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
                  <div key={i} className="h-16 bg-slate-700 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatBlock title="Solved" value={userStats?.solvedProblems || 0} color="cyan" />
                <StatBlock title="Easy" value={userStats?.easyCount || 0} color="green" />
                <StatBlock title="Medium" value={userStats?.mediumCount || 0} color="yellow" />
                <StatBlock title="Hard" value={userStats?.hardCount || 0} color="red" />
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
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        getDifficultyColor(submission.difficulty)
                      }`}
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
