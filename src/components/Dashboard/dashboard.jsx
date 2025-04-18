import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AttendanceMarking from "./AttendanceMarking";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Sidebar state added

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar with props */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? "240px" : "0px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <AttendanceMarking />
      </div>
    </div>
  );
};

export default Dashboard;
