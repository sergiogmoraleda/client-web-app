import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import Header from "./Header";
import Login from "./Login";
import Cuenta from "./Cuenta";
import SignUp from "./SignUp";

const App = () => {
  return (
    <div className="center w85">
      <div className="ph3 pv1 background-gray">
        <Header />
        <Routes>
          <Route path="/home" element={<UserList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cuenta" element={<Cuenta />} />
        </Routes>
      </div>
    </div>
   
  );
};

export default App;
