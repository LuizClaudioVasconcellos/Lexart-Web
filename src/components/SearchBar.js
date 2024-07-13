// SearchBar.js
import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  align-self: flex-end;
`;

const SearchInput = styled.input`
  padding: 10px 30px 10px 10px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <SearchIcon>
        <i className="material-icons">search</i>
      </SearchIcon>
    </SearchContainer>
  );
};

export default SearchBar;
