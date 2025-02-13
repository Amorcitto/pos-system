import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProductList from "./pages/Products";
import CartPage from "./pages/Cart";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Retail PoS</h1>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
