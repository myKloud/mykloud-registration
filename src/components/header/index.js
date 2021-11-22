import React, { useState, useEffect, useRef } from "react";
import { css } from "./header.css";
import img from "../../images/myKloud_logo.png";
import phoneImg from "../../images/app-logo.png";
import useSize from "@react-hook/size";
import useWindowDimensions from "./useWindowDimensions";

const Header = () => {
  const breakpoint = 768;
  const { height, width } = useWindowDimensions();

  return (
    <div className="header">
      <div className="leftSide">
        {width > breakpoint ? (
          <img src={img} alt="Logo image" className="logo1"></img>
        ) : (
          <img src={phoneImg} alt="Logo image" className="logo1"></img>
        )}
      </div>
      <div className="rightSide">
        <p className="rightText">Already have an account?</p>
        <button className="signInBtn">Sign in</button>
      </div>
    </div>
  );
};

export default Header;
