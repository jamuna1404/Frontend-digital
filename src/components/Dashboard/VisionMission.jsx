import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const VisionMission = ({ isSidebarOpen }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height for vertical centering
        transition: "margin-left 0.3s ease-in-out",
        marginLeft: isSidebarOpen ? "240px" : "0px", // Adjust based on sidebar
        padding: "20px",
      }}
    >
      <Paper
        sx={{
          p: 3,
          backgroundColor: "#1a1a1a",
          color: "white",
          boxShadow: "0px 0px 10px #00bfff",
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#00bfff", mb: 2 }}>
          Vision & Mission
        </Typography>

        <Typography variant="h6" sx={{ color: "#00bfff" }}>
          Vision:
        </Typography>
        <Typography>
          To be a globally recognized institution that excels in innovation, research, and leadership in education.
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, color: "#00bfff" }}>
          Mission:
        </Typography>
        <Typography>
          1. Provide quality education with a focus on real-world problem-solving and innovation.  
          2. Foster an environment of continuous learning and technological advancement.  
          3. Empower students with leadership, ethical values, and a passion for excellence.
        </Typography>
      </Paper>
    </Box>
  );
};

export default VisionMission;
