import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import EditProduct from "./components/EditProduct";
import Logs from "./pages/Logs";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Products />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/products/edit/:id" element={<EditProduct />} />
            <Route exact path="/logs" element={<Logs />} />
          </Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
};
export default App;
