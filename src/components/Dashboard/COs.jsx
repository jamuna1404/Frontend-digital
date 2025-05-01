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
  TableSortLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CourseOutcomes = () => {
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, coNumber: "", description: "", attainment: "" },
    ]);
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

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedRows = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setRows(sortedRows);
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
        Course Outcomes (CO)
      </Typography>

      {/* Filter Input */}
      <TextField
        label="Filter by Description"
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "#4F5B67",
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
          boxShadow: "0px 0px 8px rgba(2, 3, 3, 0.8)",
          backgroundColor: "#222232",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                <TableSortLabel
                  active={sortConfig.key === "coNumber"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("coNumber")}
                  sx={{ color: "white" }}
                >
                  CO Number
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                <TableSortLabel
                  active={sortConfig.key === "description"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("description")}
                  sx={{ color: "white" }}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                <TableSortLabel
                  active={sortConfig.key === "attainment"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("attainment")}
                  sx={{ color: "white" }}
                >
                  Attainment Level
                </TableSortLabel>
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
                        "&:hover fieldset": { borderColor: "#4f3b31" },
                      },
                    }}
                    value={row.coNumber}
                    onChange={(e) =>
                      handleInputChange(row.id, "coNumber", e.target.value)
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
                    value={row.attainment}
                    onChange={(e) =>
                      handleInputChange(row.id, "attainment", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
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

export default CourseOutcomes;
