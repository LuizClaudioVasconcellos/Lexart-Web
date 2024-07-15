// ProductGrid.js
import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const GridContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductGrid = ({ products, onDelete, onEdit, onImageClick }) => {
  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
          onImageClick={onImageClick}
        />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
