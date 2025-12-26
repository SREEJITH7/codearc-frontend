// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import UserRoutes from "./router/UserRoutes";

// import RecruiterRoutes from "./router/RecruiterRoutes";
// import AdminRoutes from "./router/AdminRoutes";



// export default function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <UserRoutes />
//       <RecruiterRoutes />
//       <AdminRoutes />
//     </BrowserRouter>
//   );
// }


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserRoutes from "./router/UserRoutes";
import RecruiterRoutes from "./router/RecruiterRoutes";
import AdminRoutes from "./router/AdminRoutes";

import LoadingOverlay from "./component/common/LoadingOverlay";
import { useAppSelector } from "./hooks";


export default function App() {

  const {loading, loadingMessage} = useAppSelector((state) => state.auth); 
  

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading && (
  <LoadingOverlay message={loadingMessage ||  "Please wait..."} />
)}


      <Routes>
        {/* All routes combined in one Routes component */}
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/recruiter/*" element={<RecruiterRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}