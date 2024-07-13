import React, { useEffect, useState } from "react";
import api from "../services/api";
import styled, { keyframes } from "styled-components";
import Loading from "../components/Loading";
import FloatingForm from "../components/FloatingForm";
import ActionBar from "../components/ActionBar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import DeleteAllProducts from "../components/DeleteAllProducts";
import { sendMessageToWebSocketClients } from "../services/websocket";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false); // Estado para controlar se está deletando todos os produtos

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleForm = () => setShowForm(!showForm);

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Inicia o estado de loading
      const response = await api.post("/products", data);
      setProducts([...products, response.data]);
      setShowForm(false);
      // Exibir Toast de sucesso
    } catch (error) {
      console.error("Error adding product:", error);
      // Exibir Toast de erro
    } finally {
      setLoading(false); // Finaliza o estado de loading após a operação
    }
  };

  const deleteAllProducts = async () => {
    setDeletingAll(true); // Ativa o estado de deletando todos os produtos

    try {
      // Envia mensagem inicial ao WebSocket indicando início da exclusão em massa
      sendMessageToWebSocketClients(
        JSON.stringify({ progress: 0, message: "Deletion started" })
      );

      const response = await api.delete("/products");
      console.log("Deletion response:", response.data);

      // Envia mensagem final ao WebSocket indicando conclusão da exclusão em massa
      sendMessageToWebSocketClients(
        JSON.stringify({ progress: 100, message: "Deletion completed" })
      );
    } catch (error) {
      console.error("Error deleting all products:", error);
    } finally {
      setDeletingAll(false); // Desativa o estado de deletando todos os produtos
    }
  };

  const onProductsAdded = (newProducts) => {
    setProducts([...products, ...newProducts]);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Title>Products</Title>
      <ActionBar onSearch={handleSearch} toggleForm={toggleForm} />
      <DeleteAllProducts
        onDeleteAll={deleteAllProducts}
        deletingAll={deletingAll}
        fetchProducts={fetchProducts}
      />
      <ProductGrid products={currentProducts} onDelete={handleDelete} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
      {showForm && (
        <FloatingForm
          onSubmit={onSubmit}
          onClose={toggleForm}
          onProductsAdded={onProductsAdded}
          fetchProducts={fetchProducts}
        />
      )}
    </Container>
  );
};

export default Products;
