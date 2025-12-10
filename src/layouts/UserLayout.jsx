import React from 'react';
import UserNavbar from '../component/user/UserNavbar';
import UserFooter from '../component/user/UserFooter';

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
        <UserNavbar/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
      <UserFooter/>
    </div>
  );
};

export default UserLayout;