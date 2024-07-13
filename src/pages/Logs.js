import React, { useState, useEffect } from "react";
import api from "../services/api";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/products/logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <span>{`Product ID: ${log.productId}, Deleted At: ${log.deletedAt}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
