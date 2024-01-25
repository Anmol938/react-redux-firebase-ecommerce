import React, { useEffect } from "react";
import "./default.scss";
import Homepage from "./pages/Homepage/Homepages";
import Registration from "./pages/Registration";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";

import { auth, handleUserProfile } from "./firebase/utils";
import { onSnapshot } from "firebase/firestore";

import Recovery from "./pages/Recovery";

import { setCurrentUser } from "./redux/User/user.actions";
import { useSelector, useDispatch } from "react-redux";

import Dashboard from "./pages/Dashboard";

import WithAuth from "./hoc/withAuth"


const App = props =>  {
  

  const dispatch =  useDispatch();  

  useEffect(() => {

    // all below lines before return is called is for componenet did mount

    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        console.log(userRef); 
        // Fixed: Move the onSnapshot() call inside the handleUserProfile() function.
        userRef.onSnapshot(async (snapshot) => {
          dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          }));
        });
        console.log("reached here");
      } 
      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener(); // in return function we perform clean up functions for component will unmount
    };
  }, [])



    console.log("Inside App component. currentUser:", /*currentUser*/); // Add this line

    return (
      <div className="App">
        <Routes>
          
          <Route
           exact path="/"
            element={<HomePageLayout><Homepage /></HomePageLayout>}
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
            path="/Recovery"
            element={<MainLayout><Recovery /></MainLayout>}
          />
            <Route
            path="/Dashboard"
            element={<WithAuth><MainLayout><Dashboard /></MainLayout></WithAuth>} 
            />
        </Routes>
      </div>
    );
  }




export default App;
