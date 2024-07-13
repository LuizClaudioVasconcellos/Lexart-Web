import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ProgressBar = styled.progress`
  margin-top: 10px;
  width: 100%;
`;

const DeleteAllProducts = ({ fetchProducts }) => {
  const [progress, setProgress] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAll = async () => {
    try {
      setDeleting(true);
      const response = await api.delete("/products");

      if (response.status === 204) {
        console.log("Response:", response.data);
        setDeleting(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting all products:", error);
    }
  };

  useEffect(() => {
    if (deleting) {
      const socket = new WebSocket("ws://localhost:3334");

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.progress) {
          setProgress(data.progress);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [deleting]);

  return (
    <Container>
      <Button onClick={handleDeleteAll} disabled={deleting}>
        {deleting ? "Deleting..." : "Delete All Products"}
      </Button>
      {deleting && <ProgressBar value={progress} max="100"></ProgressBar>}
    </Container>
  );
};

export default DeleteAllProducts;
