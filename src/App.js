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


const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        console.log(userRef); 
        // Fixed: Move the onSnapshot() call inside the handleUserProfile() function.
        userRef.onSnapshot(async (snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
        console.log("reached here");
      } else {
        this.setState({ ...initialState });
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    console.log("Inside App component. currentUser:", currentUser); // Add this line

    return (
      <div className="App">
        <Routes>
          <Route
            path="*"
            element={
              <HomePageLayout currentUser={currentUser}>
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
              <MainLayout currentUser={currentUser}>
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
                <MainLayout currentUser={currentUser}>
                  <Routes>
                    <Route index element={<Login />} />
                  </Routes>
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
