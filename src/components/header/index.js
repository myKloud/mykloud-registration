import React from "react";
import "./style.scss";

const Header = () => {
  const redirect_url = () => {
    window.location = "http://www.mykloud.io";
  };

  let description = "Don’t have an account?";
  let action = "Register";

  if (window.location.pathname !== "/") {
    description = "Already have an account?";
    action = "Sign in";
  }
  return (
    <>
      <div className="header_container mb-8">
        <div className="left_side">
          <div className="mykloud_logo" onClick={redirect_url} />
        </div>
        <div className="right_side">
          <p className="right_text mr-2">{description}</p>
          <button className="signin_btn">{action}</button>{" "}
        </div>
      </div>
    </>
  );
};

export default Header;
