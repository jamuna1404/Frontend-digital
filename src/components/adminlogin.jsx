import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/staffl.jpeg") no-repeat center center/cover;  /* Background image covers entire screen */
  position: relative;
  overflow: hidden;
`;

const LoginCard = styled.div`
  position: relative;
  background: rgba(245, 247, 248, 0.75);  /* Semi-transparent white background */
  padding: 2rem;
  border-radius: 10px;
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
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Link = styled.a`
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -5px;
`;

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordError("");
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <Container>
      {showPopup && <SuccessPopup show={showPopup}>Successfully Logged In!</SuccessPopup>}
      <LoginCard>
        <h2>Admin Login</h2>
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
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <Links>
            <Link href="#">Forgot Password?</Link>
          </Links>
          <LoginButton type="submit">Login</LoginButton>
        </form>
      </LoginCard>
    </Container>
  );
};

export default AdminLogin;
