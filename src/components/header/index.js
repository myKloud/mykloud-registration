import React, { useState } from "react";
import { css } from "./header.css";
import img from "../../images/app-logo.png";
const Header = () => {
  return (
    <div className="header">
      <div className="leftSide">
        <img src={img} alt="Logo image" className="logo"></img>
        <h1 className="logoText">myKloud</h1>
      </div>
      <div className="rightSide">
        <p className="rightText">Already have an account?</p>
        <button className="signInBtn">Sign in</button>
      </div>
    </div>
  );
};

export default Header;
