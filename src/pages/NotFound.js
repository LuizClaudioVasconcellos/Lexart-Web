// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>404 - Not Found</Title>
      <Message>The page you are looking for does not exist.</Message>
      <Button onClick={goHome}>Go Home</Button>
    </Container>
  );
};

export default NotFound;
