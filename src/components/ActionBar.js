// ActionBar.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const ActionBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled(Link)`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const ActionBar = ({ onSearch, toggleForm }) => {
  const handleToggleForm = () => {
    if (toggleForm) {
      toggleForm();
    }
  };

  return (
    <ActionBarContainer>
      <AddButton to="#" onClick={handleToggleForm}>
        <i className="material-icons">add</i>Add Product
      </AddButton>
      <SearchBar
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </ActionBarContainer>
  );
};

export default ActionBar;
