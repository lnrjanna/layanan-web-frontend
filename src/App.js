import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './components/Account';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import DashboardAdmin from './components/DashboardAdmin';
import FormAccount from './components/Form_Account';
import ProductPage from './components/ProductPage';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import OrderPage from './components/OrderPage';
import Collections from './components/Collections';
import DetailProduct from './components/ProductDetail';
import Order from './components/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard_admin" element={<DashboardAdmin />} />
        <Route path="/form_account" element={<FormAccount />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/detailproduct/:id" element={<DetailProduct />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
