import React, { useEffect } from "react";
import "./default.scss";
import Homepage from "./pages/Homepage/Homepages";
import Registration from "./pages/Registration";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import Login from "./pages/Login";

import Recovery from "./pages/Recovery";

import { checkUserSession } from "./redux/User/user.actions";
import {  useDispatch } from "react-redux";

import Dashboard from "./pages/Dashboard";

import WithAuth from "./hoc/withAuth"
import Admin from "./pages/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import AdminToolBar from "./components/AdminToolbar";

import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Search from "./pages/Search";
import ProductDetails from './pages/ProductDetails'

import Cart from './pages/Cart';
import Payment from './pages/Payment';

import Order from './pages/Order';




const App = props =>  {
  

  const dispatch =  useDispatch();  

  useEffect(() => {

    dispatch(checkUserSession());  
  }, [])



    console.log("Inside App component. currentUser:", /*currentUser*/); // Add this line

    return (
      <div className="App">
        <AdminToolBar/>
        <Routes>
          <Route
           exact path="/"
            element={<HomePageLayout><Homepage /></HomePageLayout>}
          />
          <Route
          path="/search"
          element={<MainLayout><Search/></MainLayout>}
          />
          <Route 
          path="/search/:filterType"
          element={<MainLayout><Search/></MainLayout>}
          />
          <Route 
          path="/product/:productID"
          element={<MainLayout><ProductDetails/></MainLayout>}
          />
          <Route 
          path="/cart"
          element={<MainLayout><Cart/></MainLayout>}
          />
          <Route 
          path="/payment"
          element={<WithAuth><MainLayout><Payment/></MainLayout></WithAuth>}
          />
          <Route
          path="/registration"
          element={<MainLayout><Registration /></MainLayout>}
        /> 
          <Route
            path="/login"
            element={<MainLayout ><Login /></MainLayout>} 
          />
           <Route
            path="/recovery"
            element={<MainLayout><Recovery /></MainLayout>}
          />
            <Route
            path="/dashboard"
            element={<WithAuth><DashboardLayout><Dashboard /></DashboardLayout></WithAuth>} 
            />
            <Route
            path="/order/:orderID"
            element={<WithAuth><DashboardLayout><Order /></DashboardLayout></WithAuth>} 
            />
            <Route
            path="/Admin"
            element={<WithAdminAuth><AdminLayout><Admin /></AdminLayout></WithAdminAuth>} 
            />
        </Routes>
      </div>
    );
  }




export default App;
