import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const AttendanceReport = ({ attendanceData }) => {
  // Sample data structure
  const defaultData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Attendance (%)",
        data: [95, 88, 92, 85, 90, 96, 89, 94, 91, 87, 93, 97], // Replace with real data
        backgroundColor: "rgba(0, 150, 255, 0.6)",
        borderColor: "rgba(0, 150, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h2>Attendance Overview</h2>
      <Bar data={attendanceData || defaultData} />
      <h2>Monthly Attendance Trends</h2>
      <Line data={attendanceData || defaultData} />
      <h2>Absentees Percentage</h2>
      <Pie
        data={{
          labels: ["Present", "Absent"],
          datasets: [
            {
              label: "Absentees",
              data: [90, 10], // Replace with actual attendance/absence ratio
              backgroundColor: ["#00aaff", "#ff5555"],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default AttendanceReport;
