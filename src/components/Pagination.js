import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: ${({ active }) => (active ? "#0056b3" : "#007bff")};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#0056b3" : "#0056b3")};
  }
`;

const NavigationButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const updateVisiblePages = () => {
      const maxVisiblePages = 10;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      setVisiblePages(pages);
    };

    updateVisiblePages();
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <PaginationContainer>
      <NavigationButton onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </NavigationButton>
      {visiblePages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
        >
          {page}
        </PageButton>
      ))}
      <NavigationButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
