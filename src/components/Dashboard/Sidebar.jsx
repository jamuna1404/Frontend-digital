import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Button,
  IconButton,
  Typography,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom"; // ✅ include useNavigate

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledDrawer = styled(Drawer)(({ theme, open, width }) => ({
  "& .MuiDrawer-paper": {
    width: open ? width.drawer : width.collapsed,
    backgroundColor: "#4F5B67",
    color: "white",
    borderRight: "2px solid rgba(255, 255, 255, 0.1)",
    transition: "width 0.3s ease-in-out",
    overflowX: "hidden",
    position: "fixed",
  },
}));

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/dashboard" },
  { text: "Vision Mission", icon: <AssignmentIcon />, path: "/dashboard/VisionMission" },
  { text: "PO", icon: <PersonIcon />, path: "/dashboard/POs" },
  { text: "PSO", icon: <SchoolIcon />, path: "/dashboard/PSOs" },
  { text: "CO", icon: <FormatListNumberedIcon />, path: "/dashboard/COs" },
  { text: "Attendance", icon: <AssessmentIcon />, path: "/dashboard/Attendance" },
  { text: "Assessment Methods", icon: <AssessmentIcon />, path: "/dashboard/AssessmentMethods" },
  { text: "Grade Distribution", icon: <AssessmentIcon />, path: "/dashboard/GradeDistribution" },
  { text: "Lecture Tracking", icon: <DescriptionIcon />, path: "/dashboard/LectureTracking" },
  { text: "PDF Generator", icon: <PictureAsPdfIcon />, path: "/dashboard/PDFGeneration" },
];

const Sidebar = ({ isOpen, toggleOpen, drawerWidth, collapsedWidth }) => {
  const widths = { drawer: drawerWidth, collapsed: collapsedWidth };
  const navigate = useNavigate(); // ✅ useNavigate hook for redirect

  const handleLogout = () => {
    // Optional: Clear any auth state if used
    // localStorage.clear(); or sessionStorage.clear();
    navigate("/"); // ✅ redirect to staff login
  };

  return (
    <>
      {/* Toggle button */}
      <IconButton
        onClick={toggleOpen}
        sx={{
          position: "fixed",
          top: 15,
          left: 15,
          zIndex: 1300,
          backgroundColor: "#111",
          color: "white",
          transition: "0.3s ease-in-out",
          "&:hover": { color: "#00bfff", boxShadow: "0px 0px 8px #00bfff" },
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar Drawer */}
      <StyledDrawer variant="permanent" open={isOpen} width={widths}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, mt: 8 }}>
          <Avatar sx={{ width: isOpen ? 64 : 40, height: isOpen ? 64 : 40, bgcolor: "#222" }}>
            <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
          </Avatar>
          {isOpen && (
            <Typography variant="h6" sx={{ mt: 1, color: "white" }}>
              Staff
            </Typography>
          )}
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <List sx={{ mt: 1 }}>
          {menuItems.map(({ text, icon, path }) => (
            <Tooltip key={text} title={!isOpen ? text : ""} placement="right">
              <ListItem
                component={Link}
                to={path}
                button
                sx={{
                  transition: "0.3s ease-in-out",
                  "&:hover": { backgroundColor: "#4f3b31" },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: "center" }}>
                  {icon}
                </ListItemIcon>
                {isOpen && <ListItemText primary={text} sx={{ color: "white" }} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <Box sx={{ p: 2, textAlign: "center", mt: "auto" }}>
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon />}
            sx={{
              backgroundColor: "#222",
              color: "white",
              fontWeight: "bold",
              width: isOpen ? "100%" : "auto",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#00bfff", boxShadow: "0px 0px 8px #00bfff" },
            }}
            onClick={handleLogout}
          >
            {isOpen && "Logout"}
          </Button>
        </Box>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
