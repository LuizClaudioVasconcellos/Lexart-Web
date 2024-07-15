// src/components/ProductModal.js
import React from "react";
import styled from "styled-components";
import productImage from "../images/image.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const UserModal = ({ user, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <h2>{user.name}</h2>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserModal;
