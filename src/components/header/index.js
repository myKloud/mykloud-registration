import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import Localization from "./localization";

const Header = (props) => {
  const redirect_url = () => {
    window.location = "http://www.mykloud.io";
  };

  let description = Localization.account_not_exist;
  let action = Localization.register;
  let path = "/register";

  if (window.location.pathname !== "/login") {
    description = Localization.account_exist;
    action = Localization.sign_in;
    path = "/login";
  }

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="header_container">
        <div className="left_side">
          <div className="mykloud_logo" onClick={redirect_url} />
        </div>
        <div className="right_side">
          <p className="right_text mr-2">{description}</p>
          <button
            className="signin_btn"
            onClick={() => (window.location.pathname = path)}
          >
            {action}
          </button>{" "}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ languageReducer }) => ({
  languageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
