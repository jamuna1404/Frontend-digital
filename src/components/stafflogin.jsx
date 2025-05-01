import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

// Global styles
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow: hidden;
  }
`;

// Main container with background image
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    height: 100%; width: 100%;
    background-image: url('/staffl.jpeg'); /* Ensure correct path */
    background-size: cover;
    background-position: center;
    filter: blur(4px) brightness(0.7); /* Reduced blur here */
    z-index: 0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;


// Admin button
const AdminButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 8px 16px;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
`;

// Login card
const LoginCard = styled.div`
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
  z-index: 1;
`;

// Input
const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin: 12px 0;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
`;

// Button
const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #000;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    background: #333;
  }
`;

// Error message
const ErrorMessage = styled.p`
  color: #ffdddd;
  font-size: 0.9rem;
  margin: 5px 0;
`;

// Success popup
const SuccessPopup = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: 2;
`;

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/dashboard/Sidebar");
    }, 2000);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <AdminButton onClick={() => navigate("/adminlogin")}>
          Admin
        </AdminButton>
        <LoginCard>
          <h2>Staff Login</h2>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LoginButton type="submit">Login</LoginButton>
          </form>
        </LoginCard>
        {showSuccess && (
          <SuccessPopup show={showSuccess}>
            ✅ Successfully Logged In
          </SuccessPopup>
        )}
      </Container>
    </>
  );
};

export default StaffLogin;
