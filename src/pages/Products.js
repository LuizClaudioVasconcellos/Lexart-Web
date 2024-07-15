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
import { FaBoxOpen } from "react-icons/fa"; // Importa o ícone de caixa aberta
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "../components/ProductModal";

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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Message = styled.p`
  color: #555;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const Icon = styled(FaBoxOpen)`
  color: #555;
  font-size: 50px;
  margin-top: 10px;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false); // Estado para controlar se está deletando todos os produtos
  const [product, setProduct] = useState({}); // Estado para controlar se está deletando todos os produtos
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleEdit = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      if (response.status === 200) {
        toggleForm();
        setProduct(response.data);
      } else {
        setProduct({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      if (response.status === 204) {
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product delete sucess");
      } else {
        toast.error("Delete product error");
      }
    } catch (error) {
      console.error(error);
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
      product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    products.filter((product) =>
      product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleForm = () => {
    setProduct({});
    setShowForm(!showForm);
  };

  const onSubmit = async (data, onClose) => {
    const hasEdit = product.id;
    try {
      setLoading(true); // Inicia o estado de loading
      const response = hasEdit
        ? await api.put(`/products/${product.id}`, data)
        : await api.post("/products", data);
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        const filteredProducts = products.filter(
          (item) => item.id !== product.id
        );
        setProducts([...filteredProducts, response.data]);
        setShowForm(false);
        toast.success(`Product ${hasEdit ? "edited" : "added"} successfully!`);
        onClose();
      } else {
        toast.error(
          `Failed to ${hasEdit ? "edit" : "add"} product. Please try again.`
        );
      }
    } catch (error) {
      console.error(`Error adding product:`, error);
      toast.error(
        `Error ${hasEdit ? "editing" : "adding"} product: ${error.message}`
      );
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

  const closeModal = () => {
    setSelectedProduct(null);
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
      {products.length === 0 ? (
        <MessageContainer>
          <Message>Nenhum produto registrado</Message>
          <Icon />
        </MessageContainer>
      ) : (
        <>
          <ProductGrid
            products={currentProducts}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onImageClick={setSelectedProduct}
          />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          )}
        </>
      )}
      {showForm && (
        <FloatingForm
          onSubmit={onSubmit}
          onClose={toggleForm}
          onProductsAdded={onProductsAdded}
          fetchProducts={fetchProducts}
          editValue={product}
        />
      )}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </Container>
  );
};

export default Products;
