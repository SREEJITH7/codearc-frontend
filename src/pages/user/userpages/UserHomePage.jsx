import React, { useState } from "react";
import { Trophy, Clock } from "lucide-react";
import UserLayout from "../../../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { Search } from "../../../component/common/Search";

const UserHomePage = () => {
  const [selectedDate, setSelectedDate] = useState(4);
  const [currentMonth, setCurrentMonth] = useState("May");
  const navigate = useNavigate()

  const calendarDays = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, null, null, null],
  ];

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Welcome to CodeArc!
                </h1>
                <p className="text-gray-300 mb-4">
                  Your coding journey starts here. Complete your profile to get started.
                </p>
                 <button 
        onClick={() => navigate('/user/profile')}
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300"
      >
        Complete Your Profile
      </button>
              </div>
            </div>

            {/* Daily Challenge Card */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-bold text-white">
                      Daily Challenge
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>24h remaining</span>
                  </div>
                </div>
                <div className="bg-slate-700/60 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Two Sum
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Given an array of integers nums and an integer target,
                    return indices of the two numbers...
                  </p>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300">
                  Start Challenge
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/40 border border-slate-600/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-400 text-sm">Problems Solved</div>
              </div>
              <div className="bg-slate-700/40 border border-slate-600/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-400 text-sm">Current Streak</div>
              </div>
              <div className="bg-slate-700/40 border border-slate-600/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-400 text-sm">Profile Completion</div>
              </div>
            </div>
          </div>

        

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {currentMonth} 2024
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-3">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={index}
                    className={`text-center text-xs font-medium py-2 ${
                      index === 0
                        ? "text-red-400"
                        : index === 6
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.flat().map((day, index) => (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(day)}
                    className={`text-center text-sm py-2 rounded-lg cursor-pointer transition-all ${
                      day === null
                        ? ""
                        : day === selectedDate
                        ? "bg-blue-500 text-white font-medium"
                        : "text-gray-300 hover:bg-slate-600/50"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Profile Completion
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Basic Info</span>
                  <span className="text-green-400 text-sm">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Resume</span>
                  <span className="text-yellow-400 text-sm">!</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Skills</span>
                  <span className="text-yellow-400 text-sm">!</span>
                </div>
                <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 font-semibold py-2 px-4 rounded-lg transition-all text-sm">
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHomePage;

// ------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Trophy,
//   Clock,
//   BarChart3,
// } from "lucide-react";
// import { Search } from "../../../component/common/Search";
// import UserLayout from "../../../layouts/UserLayout";
// // import ProblemList from "../../../component/user/ProblemList";
// // import { DropdownFilter } from "../../../component/common/DropDownFilter";

// const UserHomePage = () => {
//   const [selectedDate, setSelectedDate] = useState(4);
//   const [currentMonth, setCurrentMonth] = useState("May");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const calendarDays = [
//     [null, null, null, 1, 2, 3, 4],
//     [5, 6, 7, 8, 9, 10, 11],
//     [12, 13, 14, 15, 16, 17, 18],
//     [19, 20, 21, 22, 23, 24, 25],
//     [26, 27, 28, 29, null, null, null],
//   ];

//   const trendingCompanies = [
//     "Google",
//     "Microsoft",
//     "Amazon",
//     "Meta",
//     "Apple",
//     "Netflix",
//   ];

//   return (
//     <UserLayout>
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* ---------------- MAIN CONTENT ---------------- */}
//           <div className="lg:col-span-3 space-y-6">
            
//             {/* Daily Challenge */}
//             <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
//               <div className="relative z-10">
                
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <Trophy className="w-6 h-6 text-blue-400" />
//                     <h2 className="text-xl font-bold text-white">Daily Challenge</h2>
//                   </div>

//                   <div className="flex items-center space-x-2 text-sm text-gray-300">
//                     <Clock className="w-4 h-4" />
//                     <span>24h remaining</span>
//                   </div>
//                 </div>

//                 <div className="bg-slate-700/60 backdrop-blur-sm rounded-xl p-4 mb-4">
//                   <h3 className="text-lg font-semibold text-white mb-2">Two Sum</h3>
//                   <p className="text-gray-300 text-sm">
//                     Given an array of integers nums and an integer target,
//                     return indices of the two numbers...
//                   </p>
//                 </div>

//                 <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300">
//                   Start Challenge
//                 </button>
//               </div>
//             </div>

//             {/* Search + Filter */}
//             <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//               <div className="relative flex-1">
//                 <Search
//                   value={searchTerm}
//                   onChange={setSearchTerm}
//                   placeholder="Search problems..."
//                 />
//               </div>

//               {/* <DropdownFilter
//                 options={[
//                   { value: "easy", label: "Easy" },
//                   { value: "medium", label: "Medium" },
//                   { value: "hard", label: "Hard" },
//                 ]}
//                 value={statusFilter}
//                 onChange={setStatusFilter}
//               /> */}
//             </div>

//             {/* Problem List */}
//             <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl">
//               <div className="divide-y divide-slate-600/20">
//                 {/* <ProblemList searchTerm={searchTerm} statusFilter={statusFilter} /> */}
//               </div>
//             </div>
//           </div>

//           {/* ---------------- SIDEBAR ---------------- */}
//           <div className="space-y-6">

//             {/* Calendar */}
//             <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-white">{currentMonth} 2024</h3>
//                 <div className="flex items-center space-x-2">
//                   <button className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors">
//                     <ChevronLeft className="w-4 h-4 text-gray-400" />
//                   </button>
//                   <button className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors">
//                     <ChevronRight className="w-4 h-4 text-gray-400" />
//                   </button>
//                 </div>
//               </div>

//               {/* Week Days */}
//               <div className="grid grid-cols-7 gap-1 mb-3">
//                 {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//                   <div
//                     key={index}
//                     className={`text-center text-xs font-medium py-2 ${
//                       index === 0
//                         ? "text-red-400"
//                         : index === 6
//                         ? "text-blue-400"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-7 gap-1">
//                 {calendarDays.flat().map((day, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => day && setSelectedDate(day)}
//                     className={`text-center text-sm py-2 rounded-lg cursor-pointer transition-all ${
//                       day === null
//                         ? ""
//                         : day === selectedDate
//                         ? "bg-blue-500 text-white font-medium"
//                         : "text-gray-300 hover:bg-slate-600/50"
//                     }`}
//                   >
//                     {day}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Trending Companies */}
//             <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-white mb-4">Trending Companies</h3>

//               <div className="space-y-3">
//                 {trendingCompanies.map((company, index) => (
//                   <div
//                     key={index}
//                     className="bg-slate-600/30 hover:bg-slate-600/50 rounded-lg px-4 py-3 transition-colors cursor-pointer flex items-center justify-between"
//                   >
//                     <span className="text-white font-medium">{company}</span>
//                     <span className="text-xs text-gray-400">
//                       {Math.floor(Math.random() * 50) + 20} questions
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default UserHomePage;
