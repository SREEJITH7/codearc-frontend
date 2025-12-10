import React from "react";
// import { AdminSidebar } from "../component/admin/AdminSidebar";
// import { AdminNavbar } from "../component/admin/AdminNavbar";
// import { AdminFooter } from "../component/admin/AdminFooter";
import { AdminSidebar } from "../component/admin/AdminSidebar.";
import { AdminFooter } from "../component/admin/AdminFooter";
import { AdminNavbar } from "../component/admin/AdminNavbar";

export const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        <AdminFooter />
      </div>
    </div>
  );
};
