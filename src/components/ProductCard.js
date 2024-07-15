import React from "react";
import styled from "styled-components";
import productImage from "../images/image.png";

const GridItem = styled.li`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 10px;
`;

const ProductName = styled.h3`
  text-align: center;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const IconButton = styled.button`
  padding: 8px;
  margin: 5px;
  background-color: ${({ color }) => color || "#007bff"};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#0056b3"};
  }

  & > i {
    font-size: 1.2rem;
    margin-right: 5px;
  }
`;

const ProductCard = ({ product, onDelete, onEdit, onImageClick }) => {
  return (
    <GridItem>
      <ProductImage
        src={productImage}
        alt={product.name}
        onClick={() => onImageClick(product)}
      />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
      <ButtonContainer>
        <IconButton
          color="#007bff"
          hoverColor="#0056b3"
          onClick={() => onEdit(product.id)}
        >
          <i className="material-icons">edit</i>Edit
        </IconButton>
        <IconButton
          onClick={() => onDelete(product.id)}
          color="#dc3545"
          hoverColor="#c82333"
        >
          <i className="material-icons">delete</i>Delete
        </IconButton>
      </ButtonContainer>
    </GridItem>
  );
};

export default ProductCard;
