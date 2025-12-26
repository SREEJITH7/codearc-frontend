// import React from "react";
// import RecruiterNavbar from "../component/recruiter/RecruiterNavbar";
// import RecruiterFooter from "../component/recruiter/RecruiterFooter";

// const RecruiterLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 text-white flex flex-col">
//       <RecruiterNavbar />
//       <div className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
//         {children}
//       </div>
//       <RecruiterFooter />
//     </div>
//   );
// };

// export default RecruiterLayout;

import React from "react";
import RecruiterNavbar from "../component/recruiter/RecruiterNavbar";
import RecruiterFooter from "../component/recruiter/RecruiterFooter";

const RecruiterLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <RecruiterNavbar />
      <main className="flex-1">{children}</main>
      <RecruiterFooter />
    </div>
  );
};

export default RecruiterLayout;

