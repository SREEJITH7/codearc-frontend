

// // ------------------------------------------------------------------


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Trophy,
//   Clock,
//   X,
//   SlidersHorizontal,
// } from "lucide-react";
// import { Search } from "../../../component/common/Search";
// import UserLayout from "../../../layouts/UserLayout";
// import ProblemList from "../../../component/user/ProblemList";

// const UserHomePage = () => {
//   const [selectedDate, setSelectedDate] = useState(4);
//   const [currentMonth, setCurrentMonth] = useState("May");
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDifficulties, setSelectedDifficulties] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedCompanies, setSelectedCompanies] = useState([]);
//   const [selectedStatuses, setSelectedStatuses] = useState([]);
//   const [showPremiumOnly, setShowPremiumOnly] = useState(false);
//   const [sortBy, setSortBy] = useState("problemId");
//   const [showFilters, setShowFilters] = useState(false);

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

//   const CATEGORIES = [
//     "Array",
//     "String",
//     "Linked List",
//     "Math",
//     "Dynamic Programming",
//     "Tree",
//     "Graph",
//     "Hash Table",
//     "Stack",
//     "Queue",
//   ];

//   const DIFFICULTIES = ["Easy", "Medium", "Hard"];
//   const STATUSES = ["Solved", "Attempted", "Unsolved"];
//   const SORT_OPTIONS = [
//     { value: "problemId", label: "Problem ID" },
//     { value: "difficulty", label: "Difficulty" },
//     { value: "acceptance", label: "Acceptance Rate" },
//     { value: "title", label: "Title" },
//   ];

//   const toggleFilter = (array, setArray, value) => {
//     if (array.includes(value)) {
//       setArray(array.filter((item) => item !== value));
//     } else {
//       setArray([...array, value]);
//     }
//   };

//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedDifficulties([]);
//     setSelectedCategories([]);
//     setSelectedCompanies([]);
//     setSelectedStatuses([]);
//     setShowPremiumOnly(false);
//     setSortBy("problemId");
//   };

//   const activeFiltersCount =
//     selectedDifficulties.length +
//     selectedCategories.length +
//     selectedCompanies.length +
//     selectedStatuses.length +
//     (showPremiumOnly ? 1 : 0);

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty.toLowerCase()) {
//       case "easy":
//         return "text-green-400 bg-green-400/10";
//       case "medium":
//         return "text-yellow-400 bg-yellow-400/10";
//       case "hard":
//         return "text-red-400 bg-red-400/10";
//       default:
//         return "text-gray-300 bg-gray-500/10";
//     }
//   };

//   const handleCompanyClick = (company) => {
//     toggleFilter(selectedCompanies, setSelectedCompanies, company);
//   };

//   return (
//     <UserLayout>
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Daily Challenge Card */}
//             <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <Trophy className="w-6 h-6 text-blue-400" />
//                     <h2 className="text-xl font-bold text-white">
//                       Daily Challenge
//                     </h2>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-gray-300">
//                     <Clock className="w-4 h-4" />
//                     <span>24h remaining</span>
//                   </div>
//                 </div>
//                 <div className="bg-slate-700/60 backdrop-blur-sm rounded-xl p-4 mb-4">
//                   <h3 className="text-lg font-semibold text-white mb-2">
//                     Two Sum
//                   </h3>
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

//             {/* Search and Filter Bar */}
//             <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-4">
//               <div className="flex flex-col lg:flex-row gap-4">
//                 {/* Search */}
//                 <div className="flex-1">
//                   <Search
//                     value={searchTerm}
//                     on Change={setSearchTerm}
//                     placeholder="Search problems..."
//                   />
//                 </div>

//                 {/* Sort */}
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="bg-slate-600/50 border border-slate-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {SORT_OPTIONS.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       Sort: {option.label}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Filter Toggle Button */}
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
//                 >
//                   <SlidersHorizontal className="w-4 h-4" />
//                   Filters
//                   {activeFiltersCount > 0 && (
//                     <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
//                       {activeFiltersCount}
//                     </span>
//                   )}
//                 </button>
//               </div>

//               {/* Active Filter Tags */}
//               {activeFiltersCount > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-600/30">
//                   {selectedDifficulties.map((diff) => (
//                     <span
//                       key={diff}
//                       className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
//                     >
//                       {diff}
//                       <X
//                         className="w-3 h-3 cursor-pointer hover:text-red-400"
//                         onClick={() =>
//                           toggleFilter(
//                             selectedDifficulties,
//                             setSelectedDifficulties,
//                             diff
//                           )
//                         }
//                       />
//                     </span>
//                   ))}
//                   {selectedCategories.map((cat) => (
//                     <span
//                       key={cat}
//                       className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
//                     >
//                       {cat}
//                       <X
//                         className="w-3 h-3 cursor-pointer hover:text-red-400"
//                         onClick={() =>
//                           toggleFilter(
//                             selectedCategories,
//                             setSelectedCategories,
//                             cat
//                           )
//                         }
//                       />
//                     </span>
//                   ))}
//                   {selectedCompanies.map((comp) => (
//                     <span
//                       key={comp}
//                       className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
//                     >
//                       {comp}
//                       <X
//                         className="w-3 h-3 cursor-pointer hover:text-red-400"
//                         onClick={() =>
//                           toggleFilter(
//                             selectedCompanies,
//                             setSelectedCompanies,
//                             comp
//                           )
//                         }
//                       />
//                     </span>
//                   ))}
//                   {selectedStatuses.map((status) => (
//                     <span
//                       key={status}
//                       className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
//                     >
//                       {status}
//                       <X
//                         className="w-3 h-3 cursor-pointer hover:text-red-400"
//                         onClick={() =>
//                           toggleFilter(
//                             selectedStatuses,
//                             setSelectedStatuses,
//                             status
//                           )
//                         }
//                       />
//                     </span>
//                   ))}
//                   {showPremiumOnly && (
//                     <span className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white">
//                       Premium Only
//                       <X
//                         className="w-3 h-3 cursor-pointer hover:text-red-400"
//                         onClick={() => setShowPremiumOnly(false)}
//                       />
//                     </span>
//                   )}
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-red-400 hover:text-red-300 text-sm underline ml-2"
//                   >
//                     Clear all
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Expandable Filters Panel */}
//             {showFilters && (
//               <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-6 space-y-6">
//                 {/* Difficulty Filter */}
//                 <div>
//                   <h3 className="text-sm font-semibold mb-3 text-gray-300">
//                     Difficulty
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {DIFFICULTIES.map((diff) => (
//                       <button
//                         key={diff}
//                         onClick={() =>
//                           toggleFilter(
//                             selectedDifficulties,
//                             setSelectedDifficulties,
//                             diff
//                           )
//                         }
//                         className={`px-4 py-2 rounded-lg transition-colors font-medium ${
//                           selectedDifficulties.includes(diff)
//                             ? getDifficultyColor(diff) +
//                               " ring-2 ring-offset-2 ring-offset-slate-800"
//                             : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
//                         }`}
//                       >
//                         {diff}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Category Filter */}
//                 <div>
//                   <h3 className="text-sm font-semibold mb-3 text-gray-300">
//                     Category
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {CATEGORIES.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() =>
//                           toggleFilter(
//                             selectedCategories,
//                             setSelectedCategories,
//                             cat
//                           )
//                         }
//                         className={`px-4 py-2 rounded-lg transition-colors ${
//                           selectedCategories.includes(cat)
//                             ? "bg-blue-600 text-white font-semibold"
//                             : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
//                         }`}
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Companies Filter */}
//                 <div>
//                   <h3 className="text-sm font-semibold mb-3 text-gray-300">
//                     Companies
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {trendingCompanies.map((comp) => (
//                       <button
//                         key={comp}
//                         onClick={() =>
//                           toggleFilter(
//                             selectedCompanies,
//                             setSelectedCompanies,
//                             comp
//                           )
//                         }
//                         className={`px-4 py-2 rounded-lg transition-colors ${
//                           selectedCompanies.includes(comp)
//                             ? "bg-purple-600 text-white font-semibold"
//                             : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
//                         }`}
//                       >
//                         {comp}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <div>
//                   <h3 className="text-sm font-semibold mb-3 text-gray-300">
//                     Status
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {STATUSES.map((status) => (
//                       <button
//                         key={status}
//                         onClick={() =>
//                           toggleFilter(
//                             selectedStatuses,
//                             setSelectedStatuses,
//                             status
//                           )
//                         }
//                         className={`px-4 py-2 rounded-lg transition-colors ${
//                           selectedStatuses.includes(status)
//                             ? "bg-cyan-600 text-white font-semibold"
//                             : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
//                         }`}
//                       >
//                         {status}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Premium Toggle */}
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     id="premium"
//                     checked={showPremiumOnly}
//                     onChange={(e) => setShowPremiumOnly(e.target.checked)}
//                     className="w-4 h-4 rounded bg-slate-700 border-slate-600 cursor-pointer"
//                   />
//                   <label
//                     htmlFor="premium"
//                     className="text-gray-300 cursor-pointer"
//                   >
//                     Show Premium Problems Only
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Problems List */}
//             <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl">
//               <div className="divide-y divide-slate-600/20">
//                 <ProblemList
//                   searchTerm={searchTerm}
//                   selectedDifficulties={selectedDifficulties}
//                   selectedCategories={selectedCategories}
//                   selectedCompanies={selectedCompanies}
//                   selectedStatuses={selectedStatuses}
//                   showPremiumOnly={showPremiumOnly}
//                   sortBy={sortBy}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Calendar */}
//             <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-white">
//                   {currentMonth} 2024
//                 </h3>
//                 <div className="flex items-center space-x-2">
//                   <button className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors">
//                     <ChevronLeft className="w-4 h-4 text-gray-400" />
//                   </button>
//                   <button className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors">
//                     <ChevronRight className="w-4 h-4 text-gray-400" />
//                   </button>
//                 </div>
//               </div>

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

//               <div className="grid grid-cols-7 gap-1">
//                 {calendarDays.flat().map((day, index) => (
//                   <div
//                     key={index}
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
//               <h3 className="text-lg font-semibold text-white mb-4">
//                 Trending Companies
//               </h3>

//               <div className="space-y-3">
//                 {trendingCompanies.map((company, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleCompanyClick(company)}
//                     className={`rounded-lg px-4 py-3 transition-colors cursor-pointer flex items-center justify-between ${
//                       selectedCompanies.includes(company)
//                         ? "bg-purple-600/50 ring-2 ring-purple-500"
//                         : "bg-slate-600/30 hover:bg-slate-600/50"
//                     }`}
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
//     </UserLayout>
//   );
// };

// export default UserHomePage


// --------------------------------------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Clock,
  X,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Search } from "../../../component/common/Search";
import UserLayout from "../../../layouts/UserLayout";
import ProblemList from "../../../component/user/ProblemList";

const UserHomePage = () => {
  const [selectedDate, setSelectedDate] = useState(4);
  const [currentMonth, setCurrentMonth] = useState("May");
  const navigate = useNavigate();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState("problemId");
  const [showFilters, setShowFilters] = useState(false);

  const calendarDays = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, null, null, null],
  ];

  const trendingCompanies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
  ];

  const CATEGORIES = [
    "Array",
    "String",
    "Linked List",
    "Math",
    "Dynamic Programming",
    "Tree",
    "Graph",
    "Hash Table",
    "Stack",
    "Queue",
  ];

  const DIFFICULTIES = ["Easy", "Medium", "Hard"];
  const STATUSES = ["Solved", "Attempted", "Unsolved"];
  const SORT_OPTIONS = [
    { value: "problemId", label: "Problem ID" },
    { value: "difficulty", label: "Difficulty" },
    { value: "acceptance", label: "Acceptance Rate" },
    { value: "title", label: "Title" },
  ];

  const toggleFilter = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter((item) => item !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDifficulties([]);
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setSelectedStatuses([]);
    setShowPremiumOnly(false);
    setSortBy("problemId");
  };

  const activeFiltersCount =
    selectedDifficulties.length +
    selectedCategories.length +
    selectedCompanies.length +
    selectedStatuses.length +
    (showPremiumOnly ? 1 : 0);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-400/10";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "hard":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-300 bg-gray-500/10";
    }
  };

  const handleCompanyClick = (company) => {
    toggleFilter(selectedCompanies, setSelectedCompanies, company);
  };

  return (
    <UserLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Daily Challenge Card */}
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-blue-400" />
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
                  Given an array of integers nums and an integer target, return
                  indices of the two numbers...
                </p>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300">
                Start Challenge
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Search
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search problems..."
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-600/50 border border-slate-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filter Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-600/30">
                {selectedDifficulties.map((diff) => (
                  <span
                    key={diff}
                    className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
                  >
                    {diff}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() =>
                        toggleFilter(
                          selectedDifficulties,
                          setSelectedDifficulties,
                          diff
                        )
                      }
                    />
                  </span>
                ))}
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
                  >
                    {cat}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() =>
                        toggleFilter(
                          selectedCategories,
                          setSelectedCategories,
                          cat
                        )
                      }
                    />
                  </span>
                ))}
                {selectedCompanies.map((comp) => (
                  <span
                    key={comp}
                    className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
                  >
                    {comp}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() =>
                        toggleFilter(
                          selectedCompanies,
                          setSelectedCompanies,
                          comp
                        )
                      }
                    />
                  </span>
                ))}
                {selectedStatuses.map((status) => (
                  <span
                    key={status}
                    className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white"
                  >
                    {status}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() =>
                        toggleFilter(
                          selectedStatuses,
                          setSelectedStatuses,
                          status
                        )
                      }
                    />
                  </span>
                ))}
                {showPremiumOnly && (
                  <span className="bg-slate-600/50 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white">
                    Premium Only
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => setShowPremiumOnly(false)}
                    />
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-red-400 hover:text-red-300 text-sm underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Expandable Filters Panel */}
          {showFilters && (
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-6 space-y-6">
              {/* Difficulty Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">
                  Difficulty
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      onClick={() =>
                        toggleFilter(
                          selectedDifficulties,
                          setSelectedDifficulties,
                          diff
                        )
                      }
                      className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                        selectedDifficulties.includes(diff)
                          ? getDifficultyColor(diff) +
                            " ring-2 ring-offset-2 ring-offset-slate-800"
                          : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        toggleFilter(
                          selectedCategories,
                          setSelectedCategories,
                          cat
                        )
                      }
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedCategories.includes(cat)
                          ? "bg-blue-600 text-white font-semibold"
                          : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Companies Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">
                  Companies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingCompanies.map((comp) => (
                    <button
                      key={comp}
                      onClick={() =>
                        toggleFilter(
                          selectedCompanies,
                          setSelectedCompanies,
                          comp
                        )
                      }
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedCompanies.includes(comp)
                          ? "bg-purple-600 text-white font-semibold"
                          : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">
                  Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        toggleFilter(
                          selectedStatuses,
                          setSelectedStatuses,
                          status
                        )
                      }
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedStatuses.includes(status)
                          ? "bg-cyan-600 text-white font-semibold"
                          : "bg-slate-600/50 hover:bg-slate-600 text-gray-300"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="premium"
                  checked={showPremiumOnly}
                  onChange={(e) => setShowPremiumOnly(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600 cursor-pointer"
                />
                <label htmlFor="premium" className="text-gray-300 cursor-pointer">
                  Show Premium Problems Only
                </label>
              </div>
            </div>
          )}

          {/* Problems List */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl">
            <div className="divide-y divide-slate-600/20">
              <ProblemList
                searchTerm={searchTerm}
                selectedDifficulties={selectedDifficulties}
                selectedCategories={selectedCategories}
                selectedCompanies={selectedCompanies}
                selectedStatuses={selectedStatuses}
                showPremiumOnly={showPremiumOnly}
                sortBy={sortBy}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* AI Tutor Card */}
          <div className="bg-slate-700/40 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-indigo-600/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-white font-bold text-base">
                  Stuck on a Problem?
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Ask our AI Tutor for a hint, an explanation of the core
                concepts, or help debugging your current approach. Get
                personalized guidance without giving away the solution.
              </p>
              <button
                onClick={() => navigate("/user/ai-tutor")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Open AI Tutor
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Powered by GPT-4o
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {currentMonth} 2024
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
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

          {/* Trending Companies */}
          <div className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Trending Companies
            </h3>
            <div className="space-y-3">
              {trendingCompanies.map((company, index) => (
                <div
                  key={index}
                  onClick={() => handleCompanyClick(company)}
                  className={`rounded-lg px-4 py-3 transition-colors cursor-pointer flex items-center justify-between ${
                    selectedCompanies.includes(company)
                      ? "bg-purple-600/50 ring-2 ring-purple-500"
                      : "bg-slate-600/30 hover:bg-slate-600/50"
                  }`}
                >
                  <span className="text-white font-medium">{company}</span>
                  <span className="text-xs text-gray-400">
                    {Math.floor(Math.random() * 50) + 20} questions
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHomePage;