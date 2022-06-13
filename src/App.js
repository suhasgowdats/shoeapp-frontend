import React from "react";
import './App.css'
import { Route, Routes } from "react-router-dom";
import EditProductDetails from "./AdminDashBoard/AdComponents/EditProductDetails.js";
import AdMDashBoard from "./AdminDashBoard/AdMDashBoard.js";
import AdminProduct from "./AdminDashBoard/AdminRoutes/AdminProduct";
import FullUsers from "./AdminDashBoard/AdminRoutes/FullUsers.js";
import HomePage from "./Pages/HomePage.js";
import BookPage from "./UserDashBoard/BookPage.js";
import MyOrdresPgae from "./UserDashBoard/MyOrdresPgae.js";
import UCart from "./UserDashBoard/UCart.js";
import UPaymentPage from "./UserDashBoard/UPaymentPage.js";
import USerDashBoard from "./UserDashBoard/USerDashBoard.js";

const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<USerDashBoard />} />
        <Route path="/AdminDashboard" element={<AdMDashBoard />} />
        <Route path="/AdminProductAdd" element={<AdminProduct />} />
        <Route path="/editproduct/:id" element={<EditProductDetails />} />
        <Route path="/FullUsers" element={<FullUsers />} />
        <Route path="/cart" element={<UCart />} />
        <Route path="/userPayment" element={<UPaymentPage />} />
        <Route path="/bookproduct" element={<BookPage />} />
        <Route path="/myOrdres" element={<MyOrdresPgae />} />
        </Routes>
    </div>

  );
};

export default App;
