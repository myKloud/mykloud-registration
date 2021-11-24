import React from "react";
import img from "../../images/myKloud_logo.png";
import phoneImg from "../../images/app-logo.png";
import useWindowDimensions from "./useWindowDimensions";
import "./style.css";

const Header = () => {
  const breakpoint = 768;
  const { height, width } = useWindowDimensions();

  return (
    <>
      {width > breakpoint ? (
        <div className="header">
          <div className="leftSide">
            <img src={img} alt="Logo" className="logo1"></img>
          </div>
          <div className="rightSide">
            <p className="rightText">Already have an account?</p>
            <button className="signInBtn">Sign in</button>
          </div>
        </div>
      ) : (
        <div className="header" style={{ width: width }}>
          <div className="leftSide">
            <img src={phoneImg} alt="Logo" className="logo1"></img>
          </div>
          <div className="rightSide">
            <p className="rightText">Already have an account?</p>
            <button className="signInBtn">Sign in</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
