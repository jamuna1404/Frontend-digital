import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // 👈 Import Outlet

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? "240px" : "0px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <Outlet /> {/* 👈 This will dynamically render child routes inside Dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;
