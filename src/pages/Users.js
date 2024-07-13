// src/pages/Home.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 89.5vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled(Link)`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Welcome to the Dashboard</Title>
      <Dashboard>
        <Button to="/products">View Products</Button>
        <Button to="/add-product">Add Product</Button>
        <Button to="/logs">View Logs</Button>
      </Dashboard>
    </Container>
  );
};

export default Home;
