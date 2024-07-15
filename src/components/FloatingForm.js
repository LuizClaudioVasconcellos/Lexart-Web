import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api"; // Importando o serviço de API

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  min-height: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddTestButton = styled(IconButton)`
  display: flex;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddTestButtonText = styled.span`
  margin-left: 8px;
  font-size: 16px;
`;

const FloatingForm = ({
  onSubmit,
  onClose,
  onProductsAdded,
  fetchProducts,
  editValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: editValue.name,
      price: editValue.price,
      description: editValue.description,
    },
  });

  const submitForm = async (data) => {
    try {
      await onSubmit(data, onClose);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleAddTestProducts = async () => {
    try {
      const reponse = await api.post("/products/run");
      if (reponse.status === 200) {
        toast.success("Test products added successfully!");
        onClose();
        fetchProducts();
      } else {
        toast.error("Failed to add product. Please try again.");
      }
      onProductsAdded();
    } catch (err) {
      console.error("Error adding test products:", err);
    }
  };

  const hasEdit = editValue.id;

  return (
    <>
      <Overlay onClick={onClose} />
      <FormContainer>
        <TitleContainer>
          <h2>{hasEdit ? "Edit" : "Add"} Product</h2>
          {!hasEdit && (
            <AddTestButton onClick={handleAddTestProducts}>
              <AddIcon />
              <AddTestButtonText>Add Test Products</AddTestButtonText>
            </AddTestButton>
          )}
        </TitleContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              type="text"
              placeholder="Enter product name"
              {...register("name", {
                required: "Product name is required",
                minLength: {
                  value: 3,
                  message: "Product name must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Product name cannot exceed 100 characters",
                },
              })}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>Price:</Label>
            <Input
              type="text"
              placeholder="Enter product price"
              {...register("price", {
                required: "Product price is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Enter a valid price (e.g., 10.99)",
                },
              })}
            />
            {errors.price && <Error>{errors.price.message}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>Description:</Label>
            <TextArea
              placeholder="Enter product description"
              {...register("description", {
                required: "Product description is required",
                minLength: {
                  value: 10,
                  message: "Product description must be at least 10 characters",
                },
              })}
            />
            {errors.description && <Error>{errors.description.message}</Error>}
          </FormGroup>
          <ButtonContainer>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{hasEdit ? "Edit" : "Add"} Product</Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </>
  );
};

export default FloatingForm;
