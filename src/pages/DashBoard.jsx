import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex relative min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="py-10 w-11/12 max-w-[1000px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
