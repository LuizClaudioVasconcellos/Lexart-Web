import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 87.5vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
`;

const EditUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const history = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  const onSubmit = async (data) => {
    if (!data.password) {
      delete data.password;
    }
    try {
      const response = await api.put(`/users/${id}`, data);
      if (response.status === 200) {
        toast.success("User edited successfully!");
        history("/users");
      } else {
        setError("Editing failed. Please try again.");
        toast.error("User editing failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("User editing failed!");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        if (response.status === 200) {
          setUser(response.data);
          setValue("name", response.data.name);
          setValue("email", response.data.email);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      getUser();
    }
  }, [id, setValue]);

  if (!user.name) {
    return <Loading />;
  }

  return (
    <Container>
      <Title>Edit User</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Name"
          defaultValue={user.name}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Button type="submit">Confirm</Button>
      </Form>
    </Container>
  );
};

export default EditUser;
