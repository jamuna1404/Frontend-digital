import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const PSOs = () => {
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, psoNumber: "", description: "" }]);
  };

  // Function to delete a row
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Function to update row data
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Filtered rows based on description
  const filteredRows = rows.filter((row) =>
    row.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "90vh",
        padding: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        Program Specific Outcomes (PSO)
      </Typography>

      {/* Filter Input */}
      <TextField
        label="Filter by Description"
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "#222",
          borderRadius: "5px",
          marginBottom: 2,
          color: "white",
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "#00bfff" },
          },
        }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "90%",
          maxHeight: "70vh",
          boxShadow: "0px 0px 8px rgba(0, 191, 255, 0.8)",
          backgroundColor: "#111",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                PSO Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      input: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "gray" },
                        "&:hover fieldset": { borderColor: "#00bfff" },
                      },
                    }}
                    value={row.psoNumber}
                    onChange={(e) =>
                      handleInputChange(row.id, "psoNumber", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      input: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "gray" },
                        "&:hover fieldset": { borderColor: "#00bfff" },
                      },
                    }}
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(row.id, "description", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteRow(row.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={addRow} color="primary">
                    <AddCircleIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show "Add Row" button when all rows are deleted */}
      {rows.length === 0 && (
        <IconButton onClick={addRow} color="primary" sx={{ marginTop: 2 }}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
};

export default PSOs;
