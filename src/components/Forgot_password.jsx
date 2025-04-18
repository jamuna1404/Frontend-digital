import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

const FormCard = styled.div`
  position: relative;
  background: rgba(245, 247, 248, 0.45);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 350px;
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: calc(100% - 40px); 
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: gray;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  text-align: left;
  margin-top: 5px;
`;

const DoneButton = styled.button`
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

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff5722;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #d84315;
  }
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successfully!");
    navigate("/");
  };

  return (
    <Container>
      <Overlay />
      <BackButton onClick={() => navigate("/")}>Back</BackButton>
      <FormCard>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputContainer>
          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <InputContainer>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <EyeIcon onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputContainer>

          <DoneButton type="submit">Done</DoneButton>
        </form>
      </FormCard>
    </Container>
  );
};

export default ForgotPassword;
