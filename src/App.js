import React, { Fragment, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import EditProduct from "./components/EditProduct";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";
import SwaggerPage from "./pages/SwaggerUI";
import PrivateRoute from "./components/PrivateRoute";
import EditUser from "./pages/EditUser";
import AuthContext from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      <Fragment>
        {isAuthenticated ? <Navbar /> : <></>}
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Products />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/products/edit/:id" element={<EditProduct />} />
            <Route exact path="/logs" element={<Logs />} />
            <Route exact path="/users/edit/:id" element={<EditUser />} />
          </Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/swagger-doc" element={<SwaggerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Fragment>
    </Router>
  );
};
export default App;
