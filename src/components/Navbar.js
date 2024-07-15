import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  margin-left: 40px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  margin-right: 40px;
`;

const NavItem = styled.li`
  margin-left: 10px;
`;

const NavLinkStyled = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;

  &.active {
    background-color: #555;
  }

  &:hover {
    background-color: #555;
  }
  .button {
    background-color: transparent;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <Nav>
      <Logo
        src="https://dev-lexart-corp-site.pantheonsite.io/wp-content/uploads/2022/12/lex-white.svg"
        alt="Logo"
      />
      <NavList>
        <NavItem>
          <NavLinkStyled to="/products">Products</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled exact to="/users">
            Users
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/logs">Logs</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/login" onClick={handleLogout}>
            <LogoutIcon style={{ marginRight: "5px" }} />
          </NavLinkStyled>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
