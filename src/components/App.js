import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import Login from "./Login";
import SignUp from "./SignUp";
import Search from "./Search";
import TopUsers from "./TopUsers";
import "../styles/App.css";

const App = () => {
  return (
    <div className="app-container bg-dark text-white">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/topusers" element={<TopUsers />} />
      </Routes>
    </div>
  );
};

export default App;
