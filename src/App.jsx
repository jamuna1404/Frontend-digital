import React from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './routes'
import Sidebar from './components/Dashboard/Sidebar'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

// Define the custom colors for your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#d8b79e',  // Light Milk Chocolate color for Sidebar
    },
    secondary: {
      main: '#f3e5ab',  // Light Sandal color for Main Area
    },
    background: {
      default: '#f3e5ab',  // Light Sandal color for Main Area
    },
  },
})

function App() {
  const location = useLocation()

  // Routes that should hide the sidebar and have a specific background color
  const hideSidebarRoutes = ['/', '/adminlogin', '/Forgot_password', '/stafflogin']

  // Check if the current route is one of the login or auth pages
  const isAuthPage = hideSidebarRoutes.includes(location.pathname)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: isAuthPage ? theme.palette.background.default : '', // Apply Light Sandal background for auth pages
          overflow: isAuthPage ? 'hidden' : '', // Hide scrollbar for auth pages
        }}
      >
        {/* Conditionally render Sidebar */}
        {!isAuthPage && <Sidebar />}

        {/* Main content area */}
        <div
          style={{
            marginLeft: !isAuthPage ? '240px' : '0', // Adjust margin when Sidebar is hidden
            padding: '20px',
            flex: 1,
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <AppRoutes />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
