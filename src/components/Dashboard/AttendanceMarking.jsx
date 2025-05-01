import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const StyledMainContainer = styled(Container)(({ theme }) => ({
  display: "flex", // Flex container for centering
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  minHeight: "100vh", // Full screen height
  padding: 0, // Remove padding around the main container
}));

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})(({ sidebarOpen }) => ({
  background: "linear-gradient(135deg, #222232, #1a1a2e)", // Darker background for consistency
  color: "white", // Text color changed to white for contrast
  padding: "20px",
  marginTop: "20px",
  textAlign: "center",
  borderRadius: "15px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)", // Subtle shadow effect
  transition: "margin-left 0.3s ease-in-out",
  marginLeft: sidebarOpen ? "240px" : "0px",
  width: `calc(100% - ${sidebarOpen ? "240px" : "0px"})`,
  maxWidth: "800px", // Limit width for better alignment
  [`@media (max-width: 768px)`]: {
    marginLeft: "0px",
    width: "100%",
  },
}));

const StyledButton = styled(Button)({
  transition: "0.3s",
  color: "white", // Set text color to white
  backgroundColor: "#00bfff", // Blue theme to match CO section
  margin: "10px", // Add space between buttons
  "&:hover": {
    backgroundColor: "#007bff", // Adjusted hover effect
  },
});

const StyledTableCell = styled(TableCell)({
  backgroundColor: "#222232", // Matching table background color
  color: "white", // Text color changed to white
  fontWeight: "bold",
  cursor: "pointer",
  padding: "8px",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#333344", // Slightly darker background for text input
  borderRadius: "5px",
  "& label": {
    color: "white", // Label color changed to white for contrast
  },
  "& input": {
    color: "white", // Changed input text color to white for branch input
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00bfff", // Border color adjusted to match the theme
    },
    "&:hover fieldset": {
      borderColor: "#007bff", // Hover border color adjustment
    },
    "&.Mui-focused fieldset": {
      borderColor: "#007bff", // Focused border color for better interaction
    },
    "& svg": {
      color: "white", // Icon color changed to white
    },
  },
  "& .MuiMenuItem-root": {
    backgroundColor: (props) =>
      props.selected ? "#007bff" : "", // Highlight the selected branch with blue color
    color: (props) => (props.selected ? "white" : ""), // Change text color of the selected item
  },
}));

// Attendance Component
const AttendanceMarking = ({ sidebarOpen }) => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches] = useState(["CS", "IT", "ECE", "MECH"]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (selectedBranch) {
      setIsLoading(true);
      setTimeout(() => {
        const mockStudents = [
          { id: "001", name: "John Doe", present: true },
          { id: "002", name: "Jane Smith", present: true },
          { id: "003", name: "Michael Johnson", present: true },
          { id: "004", name: "Emily Williams", present: true },
          { id: "005", name: "Robert Brown", present: true },
        ];
        setStudents(mockStudents);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedBranch]);

  // Toggle Attendance Status
  const toggleAttendance = (studentId) => {
    setStudents(students.map((student) =>
      student.id === studentId ? { ...student, present: !student.present } : student
    ));
  };

  // Save Attendance
  const saveAttendance = () => {
    console.log("Saving attendance for:", selectedDate, selectedBranch);
    console.log("Attendance data:", students);
    setMessage({ text: "Attendance saved successfully!", type: "success" });
    setOpenSnackbar(true);
  };

  // Calculate attendance stats
  const totalStudents = students.length;
  const presentCount = students.filter(student => student.present).length;
  const absentCount = totalStudents - presentCount;

  return (
    <StyledMainContainer maxWidth="md">
      <StyledContainer maxWidth="md" sidebarOpen={sidebarOpen}>
        <div style={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            Mark Student Attendance
          </Typography>

          {/* Branch Dropdown */}
          <StyledTextField
            select
            label="Branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </StyledTextField>

          {/* Date Picker */}
          <StyledTextField
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {students.length > 0 && (
            <div>
              <StyledButton variant="contained" color="success" onClick={() => setStudents(students.map((student) => ({ ...student, present: true })))} >
                Mark All Present
              </StyledButton>
              <StyledButton variant="contained" color="error" onClick={() => setStudents(students.map((student) => ({ ...student, present: false })))} >
                Mark All Absent
              </StyledButton>
              <StyledButton variant="contained" color="primary" onClick={saveAttendance}>
                Save Attendance
              </StyledButton>
            </div>
          )}

          {/* Display Attendance Stats */}
          {students.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px" }}>
              <Typography variant="h6" sx={{ color: "white" }}>
                Total Students: {totalStudents}
              </Typography>
              <Typography variant="h6" sx={{ color: "green" }}>
                Present: {presentCount}
              </Typography>
              <Typography variant="h6" sx={{ color: "red" }}>
                Absent: {absentCount}
              </Typography>
            </div>
          )}

          {isLoading ? (
            <CircularProgress />
          ) : selectedBranch ? (
            <TableContainer component={Paper} sx={{ marginTop: "20px", backgroundColor: "#333344" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell sx={{ color: "white" }}>{student.id}</TableCell>
                      <TableCell sx={{ color: "white" }}>{student.name}</TableCell>
                      <TableCell align="center">
                        <StyledButton
                          variant="contained"
                          color={student.present ? "success" : "error"}
                          onClick={() => toggleAttendance(student.id)}
                        >
                          {student.present ? "Present" : "Absent"}
                        </StyledButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ color: "white" }}>Please select a branch to view students.</Typography>
          )}

          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
            <Alert severity={message.type}>{message.text}</Alert>
          </Snackbar>
        </div>
      </StyledContainer>
    </StyledMainContainer>
  );
};

export default AttendanceMarking;
