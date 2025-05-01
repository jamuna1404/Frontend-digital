// App.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import Sidebar from './components/Dashboard/Sidebar';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Define your theme colors
const theme = createTheme({
  palette: {
    primary: { main: '#657889' },
    secondary: { main: '#E8D9CE' },
    background: { default: '#fefeff' },
  },
});

const drawerWidth = 240;
const collapsedWidth = 70;

function App() {
  const location = useLocation();

  // **Manage sidebar open/closed here**
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Hide on these auth routes
  const hideSidebarRoutes = ['/', '/adminlogin', '/Forgot_password', '/stafflogin'];
  const isAuthPage = hideSidebarRoutes.includes(location.pathname);

  // Pick actual left-offset based on sidebar state
  const contentMarginLeft = isAuthPage
    ? 0
    : isSidebarOpen
      ? drawerWidth
      : collapsedWidth;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: isAuthPage ? 'transparent' : theme.palette.background.default,
          overflow: isAuthPage ? 'hidden' : 'auto',
        }}
      >
        {/* Sidebar only on non-auth pages, and now controlled by App */}
        {!isAuthPage && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleOpen={toggleSidebar}
            drawerWidth={drawerWidth}
            collapsedWidth={collapsedWidth}
          />
        )}

        {/* Main content */}
        <div
          style={{
            marginLeft: contentMarginLeft,
            padding: '20px',
            flex: 1,
            backgroundColor: isAuthPage ? 'transparent' : theme.palette.background.default,
            transition: 'margin-left 0.3s ease-in-out',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <AppRoutes isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
