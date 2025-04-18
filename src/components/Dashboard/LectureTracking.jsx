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
import AddCircleIcon from "@mui/icons-material/AddCircle";

const InvitedLectures = () => {
  const [rows, setRows] = useState([]);

  // Function to add a new row
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      slNo: rows.length + 1,
      dateTime: "",
      slot: "",
      contentOutline: "",
      resourcePerson: "",
      co: "",
      modeOfDelivery: "",
    };
    setRows([...rows, newRow]);
  };

  // Function to update row data
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "90vh",
        padding: 3,
        background: "rgba(0, 0, 0, 0.8)", // Dark glass background restored
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        color: "white",
        boxShadow: "0 4px 10px rgba(0, 191, 255, 0.5)", // Retain original box shadow
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#00bfff",
          textShadow: "0 0 10px rgba(0, 191, 255, 0.8)",
        }}
      >
        Invited Lectures
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: "95%",
          maxHeight: "80vh",
          boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.5)",
          padding: 2,
          background: "rgba(255, 255, 255, 0.1)", // Optional: Adds light effect
          backdropFilter: "blur(8px)",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {[
                "Sl. No",
                "Date & Time",
                "Slot",
                "Brief Outline of the Content Delivered",
                "Details of the Resource Person",
                "CO",
                "Mode of Delivery",
                "Action",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    fontWeight: "bold",
                    color: "#00bfff",
                    textShadow: "0 0 5px rgba(0, 191, 255, 0.8)",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    background: "rgba(0, 191, 255, 0.1)",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                {[
                  "dateTime",
                  "slot",
                  "contentOutline",
                  "resourcePerson",
                  "co",
                  "modeOfDelivery",
                ].map((field) => (
                  <TableCell key={field}>
                    <TextField
                      type={field === "dateTime" ? "datetime-local" : "text"}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        input: {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#00bfff",
                          },
                          "&:hover fieldset": {
                            borderColor: "#00bfff",
                            boxShadow: "0 0 10px #00bfff",
                          },
                        },
                      }}
                      value={row[field]}
                      onChange={(e) =>
                        handleInputChange(row.id, field, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={addRow}
                    sx={{
                      color: "#00bfff",
                      "&:hover": {
                        backgroundColor: "rgba(0, 191, 255, 0.3)",
                        boxShadow: "0 0 10px #00bfff",
                      },
                    }}
                  >
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
        <IconButton
          onClick={addRow}
          sx={{
            marginTop: 2,
            color: "#00bfff",
            "&:hover": {
              backgroundColor: "rgba(0, 191, 255, 0.3)",
              boxShadow: "0 0 10px #00bfff",
            },
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
};

export default InvitedLectures;
