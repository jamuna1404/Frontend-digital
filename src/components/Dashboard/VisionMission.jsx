import React from "react";
import { Box, Typography } from "@mui/material";

const VisionMission = ({ isSidebarOpen }) => {
  const sidebarWidth = isSidebarOpen ? 240 : 70;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        transition: "margin-left 0.3s ease-in-out",
        marginLeft: `${sidebarWidth}px`,
        padding: "20px",
        background: "#0f0f1a", // solid dark background
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: "850px", width: "100%" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#00bfff",
          }}
        >
          Vision & Mission
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#00bfff",
            mb: 1,
            fontWeight: 600,
          }}
        >
          Vision
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", mb: 3 }}>
          To be a globally recognized institution that excels in innovation,
          research, and leadership in education.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#00bfff",
            mb: 1,
            fontWeight: 600,
          }}
        >
          Mission
        </Typography>
        <Typography sx={{ fontSize: "1.1rem" }}>
          1. Provide quality education with a focus on real-world problem-solving and innovation.
          <br />
          2. Foster an environment of continuous learning and technological advancement.
          <br />
          3. Empower students with leadership, ethical values, and a passion for excellence.
        </Typography>
      </Box>
    </Box>
  );
};

export default VisionMission;
