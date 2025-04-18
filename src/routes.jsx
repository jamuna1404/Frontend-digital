import React from "react";
import { Routes, Route } from "react-router-dom";
import StaffLogin from "./components/stafflogin";
import AdminLogin from "./components/adminlogin";
import ForgotPassword from "./components/Forgot_password";

import VisionMission from "./components/Dashboard/VisionMission";
import POPage from "./components/Dashboard/POs";
import PSOPage from "./components/Dashboard/PSOs";
import COPage from "./components/Dashboard/COs";
import Attendance from "./components/Dashboard/AttendanceMarking";
import AssessmentMethods from "./components/Dashboard/AssessmentMethods";
import GradeDistribution from "./components/Dashboard/GradeDistribution";
import LectureTracking from "./components/Dashboard/LectureTracking";
import PDFGenerator from "./components/Dashboard/PDFGeneration";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<StaffLogin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard/VisionMission" element={<VisionMission />} />
      <Route path="/dashboard/POs" element={<POPage />} />
      <Route path="/dashboard/PSOs" element={<PSOPage />} />
      <Route path="/dashboard/COs" element={<COPage />} />
      <Route path="/dashboard/Attendance" element={<Attendance />} />
      <Route path="/dashboard/AssessmentMethods" element={<AssessmentMethods />} />
      <Route path="/dashboard/GradeDistribution" element={<GradeDistribution />} />
      <Route path="/dashboard/LectureTracking" element={<LectureTracking />} />
      <Route path="/dashboard/PDFGeneration" element={<PDFGenerator />} />
    </Routes>
  );
};

export default AppRoutes;
