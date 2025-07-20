import React from "react";
import "./style.css";
import SystemCheck from "../../components/system-check/index.jsx";

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <h1>Welcome to VSLog</h1>
      <p>Your go-to tool for debugging mobile applications.</p>
      <SystemCheck />
    </div>
  );
};

export default HomeScreen;
