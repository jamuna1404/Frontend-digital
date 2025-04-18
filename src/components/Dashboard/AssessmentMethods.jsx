import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const AssessmentMethods = () => {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "100%", 
        height: "100vh", 
        padding: 3, 
        overflow: "hidden" // Prevents scrolling
      }}
    >
      <Typography variant="h6" gutterBottom>
        Assessment Methods:
      </Typography>

      <TableContainer 
        component={Paper} 
        sx={{ 
          width: "80%", 
          boxShadow: 3,
          overflow: "hidden", // Ensures no unnecessary scrollbars
          height: "auto" // Expands to fit content
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Assessment</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Method</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Weightage</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={2} sx={{ textAlign: "center" }}>A1</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Test - I</TableCell>
              <TableCell rowSpan={2} sx={{ textAlign: "center" }}>II</TableCell>
              <TableCell rowSpan={2} sx={{ textAlign: "center" }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Quiz / Assignment / Seminar / Tutorial / Case Study / Mini Project</TableCell>
            </TableRow>

            <TableRow>
              <TableCell rowSpan={2} sx={{ textAlign: "center" }}>A2</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Test - II</TableCell>
              <TableCell rowSpan={2} sx={{ textAlign: "center" }}>II</TableCell>
              <TableCell rowSpan={2} sx={{ textAlign: "center" }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Quiz / Assignment / Seminar / Tutorial / Case Study / Mini Project</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssessmentMethods;
