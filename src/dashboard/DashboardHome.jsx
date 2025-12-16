import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.displayName}
      </h1>

      <p className="text-gray-600">
        This is your dashboard home. Recent donation requests will appear here.
      </p>
    </div>
  );
};

export default DashboardHome;