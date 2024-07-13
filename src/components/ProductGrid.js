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

const ProductGrid = ({ products, onDelete }) => {
  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={onDelete} />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
