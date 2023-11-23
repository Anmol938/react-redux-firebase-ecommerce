import React, { Component } from "react";
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
import { connect } from "react-redux";


class App extends Component {
  

  authListener = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        console.log(userRef); 
        // Fixed: Move the onSnapshot() call inside the handleUserProfile() function.
        userRef.onSnapshot(async (snapshot) => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
        console.log("reached here");
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

    console.log("Inside App component. currentUser:", currentUser); // Add this line

    return (
      <div className="App">
        <Routes>
          <Route
            path="*"
            element={
              <HomePageLayout >
                <Routes>
                  <Route index element={<Homepage />} />
                </Routes>
              </HomePageLayout>
            }
          />
          <Route
            path="/registration/*"
            element={
              currentUser ? <Navigate to='/' /> : (
              <MainLayout >
                <Routes>
                  <Route index element={<Registration />} />
                </Routes>
              </MainLayout>
              )
            }
          />
          <Route
            path="/login/*"
            element={
              currentUser ? <Navigate to="/" /> : (
                <MainLayout >
                  <Routes>
                    <Route index element={<Login />} />
                  </Routes>
                </MainLayout>
              )
            }
          />
           <Route
            path="/Recovery/*"
            element={
                <MainLayout>
                <Routes>
                  <Route index element={<Recovery />} />
                </Routes>
                </MainLayout>
            }
          />
            
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser :user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
