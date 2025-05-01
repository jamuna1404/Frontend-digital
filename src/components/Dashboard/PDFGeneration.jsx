import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { jsPDF } from "jspdf";

const AttendanceRegister = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState(""); // State for branch selection
  const [datesArray, setDatesArray] = useState([]);
  const [students, setStudents] = useState([
    { id: 1, studentId: "S001", studentName: "John Doe", attendance: {} },
    { id: 2, studentId: "S002", studentName: "Jane Smith", attendance: {} },
    // Example data, add more students if needed
  ]);

  // Generate dates between from and to
  const generateDates = () => {
    if (!fromDate || !toDate) return;

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const dates = [];

    while (start <= end) {
      dates.push(new Date(start).toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }

    setDatesArray(dates);
  };

  // Calculate the present count for each student
  const getPresentCount = (student) => {
    return Object.values(student.attendance).filter((status) => status === "P")
      .length;
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(16);
    doc.text("Attendance Register", 20, 20);

    // Add table headers
    const headers = ["#", "Student ID", "Student Name", ...datesArray, "Present Count"];
    let rows = students.map((student, idx) => [
      idx + 1,
      student.studentId,
      student.studentName,
      ...datesArray.map((date) => student.attendance[date] || "A"),
      getPresentCount(student),
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,
      theme: "grid",
    });

    // Save the PDF
    doc.save("attendance_register.pdf");
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
        Attendance Register
      </Typography>

      {/* From - To Date Inputs & Branch Selection */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          type="date"
          label="From Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "#00bfff" },
            },
          }}
        />
        <TextField
          type="date"
          label="To Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "#00bfff" },
            },
          }}
        />
        
        {/* Branch Selection */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Branch</InputLabel>
          <Select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            label="Branch"
            sx={{
              color: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "#00bfff" },
              },
            }}
          >
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Mechanical">Mechanical</MenuItem>
            <MenuItem value="Electrical">Electrical</MenuItem>
            {/* Add more branches here */}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={generateDates}
          sx={{
            backgroundColor: "#00bfff",
            color: "white",
            "&:hover": { backgroundColor: "#009acd" },
          }}
        >
          Generate Table
        </Button>
      </Box>

      {/* Attendance Table */}
      {datesArray.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            backgroundColor: "#111",
            boxShadow: "0px 0px 8px rgba(0,191,255,0.8)",
          }}
        >
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Student ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Student Name
                </TableCell>
                {datesArray.map((date) => (
                  <TableCell
                    key={date}
                    sx={{ color: "white", fontWeight: "bold", fontSize: "0.85rem" }}
                  >
                    {date}
                  </TableCell>
                ))}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Present Count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, idx) => (
                <TableRow key={student.id}>
                  <TableCell sx={{ color: "white" }}>{idx + 1}</TableCell>
                  <TableCell sx={{ color: "white" }}>{student.studentId}</TableCell>
                  <TableCell sx={{ color: "white" }}>{student.studentName}</TableCell>
                  {datesArray.map((date) => (
                    <TableCell key={date} sx={{ color: "white", fontSize: "0.85rem" }}>
                      {student.attendance[date] || "A"} {/* Display "P" or "A" */}
                    </TableCell>
                  ))}
                  <TableCell sx={{ color: "white" }}>
                    {getPresentCount(student)} {/* Show the Present Count */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* PDF Generate Button */}
      {datesArray.length > 0 && (
        <Button
          variant="contained"
          onClick={generatePDF}
          sx={{
            backgroundColor: "#00bfff",
            color: "white",
            mt: 3,
            "&:hover": { backgroundColor: "#009acd" },
          }}
        >
          Download PDF
        </Button>
      )}
    </Box>
  );
};

export default AttendanceRegister;
