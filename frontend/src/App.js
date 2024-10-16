// import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/recipe/:id" element={<RecipeDetails/>}/>
            <Route path="/create" element={<CreateRecipe/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
