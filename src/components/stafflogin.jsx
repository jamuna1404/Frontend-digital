import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/staffl.jpeg") no-repeat center center/cover;
  position: relative;
  background-size: cover; /* Make sure the background covers the entire screen */
`;

const AdminButton = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ff9800;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    background: #e68900;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
`;

const LoginCard = styled.div`
  position: relative;
  background: rgba(245, 247, 248, 0.45);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 300px;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 5px 0;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
  &:hover {
    background: #0056b3;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: black;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  margin-bottom: 20px;
`;

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = (e) => {
    e.preventDefault();

    // Example password validation, modify according to your needs
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setShowSuccess(true);

    // Redirect to dashboard after success
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/dashboard/Sidebar"); // ✅ this is a valid dashboard route
      // Navigate to staff dashboard
    }, 2000); // Delay to show success message
  };

  return (
    <Container>
      <Overlay />
      <AdminButton to="/adminlogin">Admin Login</AdminButton>
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
          <Links>
            <StyledLink to="/Forgot_password">Forgot Password?</StyledLink>
          </Links>
        
          <LoginButton type="submit">Login</LoginButton> {/* Submit form to trigger handleLogin */}
        </form>
      </LoginCard>
      {showSuccess && <SuccessPopup show={showSuccess}>✅ Successfully Logged In</SuccessPopup>}
    </Container>
  );
};

export default StaffLogin;
