import React, { useState, useEffect } from "react";
import api from "../services/api";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const LogList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LogItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogDetails = styled.span`
  color: #555;
`;

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Adicionado estado de carregamento
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/products/logs");
        console.log(response);
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };

    fetchLogs();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  if (loading) {
    return <Loading />; // Mostra o indicador de carregamento enquanto carrega
  }

  return (
    <Container>
      <Title>Logs</Title>
      <LogList>
        {currentLogs.map((log) => (
          <LogItem key={log.id}>
            <LogDetails>{`Product ID: ${log.productId}`}</LogDetails>
            <LogDetails>{`Product Name: ${log.name}`}</LogDetails>
            <LogDetails>{`Deleted At: ${new Date(
              log.deletedAt
            ).toLocaleString()}`}</LogDetails>
          </LogItem>
        ))}
      </LogList>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
  );
};

export default Logs;
