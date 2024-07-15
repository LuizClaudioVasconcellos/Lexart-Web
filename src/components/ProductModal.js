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

const ProductModal = ({ product, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <h2>{product.name}</h2>
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Name:</strong> {product.name}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <img
          src={productImage}
          alt={product.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        {/* Adicione mais campos conforme necessário */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProductModal;
