import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import api from "../services/api";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination"; // Importe o componente de paginação
import { FaUser, FaEdit, FaTrashAlt } from "react-icons/fa"; // Ícones de edição e exclusão
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserModal from "../components/UserModal";

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

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    color: #555;
    font-size: 24px;
    margin-right: 10px;
  }

  strong {
    font-size: 1.2em;
    color: #333;
  }

  p {
    color: #666;
    margin-top: 5px;
  }
`;

const Strong = styled.strong`
  cursor: pointer;
  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserActions = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: #007bff;
    }
  }
`;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    navigate(`/users/edit/${user.id}`);
    console.log("Edit user:", user);
    toast.info("Edit user feature not implemented yet.");
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      const filteredUsers = users.filter((user) => user.id !== userId);
      setUsers(filteredUsers);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Title>Users</Title>
      <UserList>
        {currentUsers.map((user) => (
          <UserItem key={user.id}>
            <UserInfo>
              <FaUser />
              <div>
                <Strong
                  onClick={() => {
                    setSelectedUser(user);
                  }}
                >
                  {user.name}
                </Strong>
                <p>Email: {user.email}</p>
                {/* Adicionar mais informações conforme necessário */}
              </div>
            </UserInfo>
            <UserActions>
              <button onClick={() => handleEdit(user)}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(user.id)}>
                <FaTrashAlt />
              </button>
            </UserActions>
          </UserItem>
        ))}
      </UserList>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <ToastContainer />
      {selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
    </Container>
  );
};

export default UsersPage;
