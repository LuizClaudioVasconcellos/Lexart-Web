import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
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

  &.active {
    background-color: #555;
  }

  &:hover {
    background-color: #555;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo src="/path/to/your/logo.png" alt="Logo" />{" "}
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
          <NavLinkStyled to="/logout">Logout</NavLinkStyled>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
