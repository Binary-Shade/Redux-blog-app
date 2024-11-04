import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import UpdatePost from "./components/UpdatePost/UpdatePost";

function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route index path="/update/:id" element={<UpdatePost/>}/>
        </Routes>
    </div>
  );
}

export default App;
