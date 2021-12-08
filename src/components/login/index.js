import React, { useState } from "react";
import { connect } from "react-redux";
import "./style.scss";
import { useHistory } from "react-router-dom";
import Input from "../common/input";
import Localization from "./localization";

const Login = (props) => {
  const [login, setLogin] = useState("email");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const next = () => {
    if (login === "email") {
      history.push("/forgetUser");
    } else {
      history.push("/forgetPass");
    }
  };

  const emailLogin = () => {
    return (
      <>
        <h1 className="form_title">{Localization.title}</h1>
        <p className="normal_text mb-10">{Localization.username_label}</p>
        <div className="mb-5">
          <div className="user_name">
            <Input
              type="text"
              autoFocus={true}
              value={user}
              onChange={setUser}
              placeholder={Localization.username_placeholder}
            />
            <span className="domain">@mykloud.io</span>
          </div>
          <p className="note mt-3" onClick={next}>
            {Localization.forget_username}
          </p>
        </div>
        <button className="next_btn" onClick={() => setLogin("password")}>
          {Localization.next}
        </button>
      </>
    );
  };

  const passwordLogin = () => {
    return (
      <>
        <h1 className="form_title">{Localization.welcome_back}</h1>
        <p className="normal_text mb-10">{`memad@mykloud.io`}</p>
        <div className="mb-5 relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            className="extra-padding"
            placeholder={Localization.password_placeholder}
          />

          <button
            className="input_visibilty"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <u style={{ color: "#1565d8" }}>{Localization.show}</u>
            ) : (
              <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
            )}
          </button>
          <p className="note mt-3" onClick={next}>
            {Localization.forget_password}
          </p>
        </div>
        <button className="next_btn">{Localization.login}</button>
      </>
    );
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="form_container login_container">
        <div className="form_wrapper">
          {login === "email" ? emailLogin() : passwordLogin()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
