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
const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})(({ sidebarOpen }) => ({
  background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
  color: "white",
  padding: "20px",
  marginTop: "20px",
  textAlign: "center",
  borderRadius: "15px",
  boxShadow: "0 4px 30px rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  transition: "margin-left 0.3s ease-in-out",
  marginLeft: sidebarOpen ? "240px" : "0px",
  width: `calc(100% - ${sidebarOpen ? "240px" : "0px"})`,
  [`@media (max-width: 768px)`]: {
    marginLeft: "0px",
    width: "100%",
  },
}));


const StyledButton = styled(Button)({
  transition: "0.3s",
  color: "white",
  "&:hover": {
    boxShadow: "0px 0px 15px #00eaff",
  },
});

const StyledTableCell = styled(TableCell)({
  backgroundColor: "#333",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
});

// Styled input fields
const StyledTextField = styled(TextField)({
  backgroundColor: "#222",
  borderRadius: "5px",
  "& label": {
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#00eaff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00eaff",
    },
    "& svg": {
      color: "white", // Icon color changed to white
    },
  },
});

// Attendance Component
const AttendanceMarking = ({ sidebarOpen }) => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches] = useState(["CS", "IT", "ECE", "MECH"]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  // Mark All
  const markAllPresent = () => {
    setStudents(students.map((student) => ({ ...student, present: true })));
  };

  const markAllAbsent = () => {
    setStudents(students.map((student) => ({ ...student, present: false })));
  };

  // Save Attendance
  const saveAttendance = () => {
    console.log("Saving attendance for:", selectedDate, selectedBranch);
    console.log("Attendance data:", students);
    setMessage({ text: "Attendance saved successfully!", type: "success" });
    setOpenSnackbar(true);
  };

  // Sorting Logic
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedStudents = [...students].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setStudents(sortedStudents);
    setSortConfig({ key, direction });
  };
  // Calculate attendance stats
const totalStudents = students.length;
const presentCount = students.filter(student => student.present).length;
const absentCount = totalStudents - presentCount;

  return (
    <StyledContainer maxWidth="md" sidebarOpen={sidebarOpen}>

      <Typography variant="h4" gutterBottom>
        Mark Student Attendance
      </Typography>
      
      {/* Branch Dropdown - Shadow Effect Added */}
      <StyledTextField
        select
        label="Branch"
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{
  "& .MuiOutlinedInput-root": {
    color: "white", // Ensures selected text color is white
    boxShadow: "0px 0px 10px rgba(0, 234, 255, 0.5)", // Neon glowing shadow effect
    "& fieldset": {
      borderColor: "white", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#00eaff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00eaff",
    },
  },
  "& .MuiSelect-select": {
    color: "white", // Ensures selected option text remains white
  },
}}

      >
        {branches.map((branch) => (
          <MenuItem 
            key={branch} 
            value={branch} 
            sx={{
              color: "white", 
              backgroundColor: "#222",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#00eaff", 
                color: "black",
                boxShadow: "0px 0px 15px #00eaff", // Glow effect on hover
              },
            }}
          >
            {branch}
          </MenuItem>
        ))}
      </StyledTextField>

      {/* Date Picker - Text & Icon Color Changed to White */}
      <StyledTextField
  label="Date"
  type="date"
  value={selectedDate}
  onChange={(e) => setSelectedDate(e.target.value)}
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
  sx={{
    "& .MuiInputBase-root": {
      color: "white", // Ensures input text is white
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#00eaff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00eaff",
      },
    },
    "& input": {
      color: "white", // Ensures the selected date is white
    },
    "& input[type=date]::-webkit-calendar-picker-indicator": {
      filter: "invert(1)", // Inverts the default black icon to white
      cursor: "pointer",
    },
  }}
/>




      {students.length > 0 && (
        <div>
          <StyledButton variant="contained" color="success" onClick={markAllPresent} sx={{ marginRight: "10px" }}>
            Mark All Present
          </StyledButton>
          <StyledButton variant="contained" color="error" onClick={markAllAbsent}>
            Mark All Absent
          </StyledButton>
          {/* Save Attendance Button */}
          <StyledButton 
            variant="contained" 
            color="primary" 
            onClick={saveAttendance} 
            sx={{ marginLeft: "10px", backgroundColor: "#00eaff", color: "black" }}
          >
            Save Attendance
          </StyledButton>
        </div>
      )}
    {/* Display Attendance Stats */}
{students.length > 0 && (
  <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px" }}>
    <Typography variant="h6" sx={{ color: "#00eaff" }}>
      Total Students: {totalStudents}
    </Typography>
    <Typography variant="h6" sx={{ color: "limegreen" }}>
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
        <TableContainer component={Paper} sx={{ marginTop: "20px", backgroundColor: "#222", color: "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell onClick={() => sortData("id")}>ID</StyledTableCell>
                <StyledTableCell onClick={() => sortData("name")}>Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} sx={{ backgroundColor: "#444", "&:hover": { backgroundColor: "#555" } }}>
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
        <Typography color="white">Please select a branch to view students.</Typography>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={message.type}>{message.text}</Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default AttendanceMarking;
