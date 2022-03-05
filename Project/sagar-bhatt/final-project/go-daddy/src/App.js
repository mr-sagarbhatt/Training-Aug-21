import "./app.scss";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignOut from "./pages/SignOut/SignOut";
import SignUp from "./pages/SignUp/SignUp";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Error from "./pages/Error/Error";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Order/Order";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='admin' element={<Admin></Admin>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='product' element={<Product></Product>}></Route>
          <Route path='cart' element={<Cart></Cart>}></Route>
          <Route path='login' element={<SignIn></SignIn>}></Route>
          <Route path='logout' element={<SignOut></SignOut>}></Route>
          <Route path='account'>
            <Route path='create' element={<SignUp></SignUp>}></Route>
          </Route>
          <Route
            path=':categorySlug/:subCategorySlug'
            element={<Product></Product>}
          ></Route>
          <Route path='profile' element={<Profile></Profile>}></Route>
          <Route path='order' element={<Order></Order>}></Route>
          <Route path='*' element={<Error></Error>}></Route>
        </Routes>
      </Router>
    );
  }
}
