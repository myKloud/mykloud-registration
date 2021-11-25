import React from "react";
import "./style.scss";

const Header = () => {
  const redirect_url = () => {
    window.location = "http://www.mykloud.io";
  };

  return (
    <>
      <div className="header_container mb-8">
        <div className="left_side">
          <div className="mykloud_logo" onClick={redirect_url} />
        </div>
        <div className="right_side">
          <p className="right_text mr-2">Already have an account?</p>
          <button className="signin_btn">Sign in</button>
        </div>
      </div>
    </>
  );
};

export default Header;
