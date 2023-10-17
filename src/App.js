import React from "react";
import './default.scss';
import Homepage from "./pages/Homepage/Homepages";
import Registration from "./pages/Registration";
import { Route,Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import { BrowserRouter as Router } from "react-router-dom";





function App() {
  console.log("Inside App component"); // Add this line

  return (
    <div className="App">
      
      <Routes>
  <Route
    path="*"
    element={
      <HomePageLayout>
        <Routes>
          <Route index element={<Homepage />} />
        </Routes>
      </HomePageLayout>
      
    }
    
  />
  <Route
    path="/registration/*"
    element={
      <MainLayout>
        <Routes>
          <Route index element={<Registration />} />
        </Routes>
      </MainLayout>
    }
  />
</Routes>



    </div>
  );
}

export default App;
