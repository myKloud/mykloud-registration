import React, { useState } from "react";
import "./style.scss";
import Input from "../common/input";

const Login = () => {
  const [login, setLogin] = useState("email");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailLogin = () => {
    return (
      <>
        <h1 className="form_title">Login to your account</h1>
        <p className="normal_text mb-10">Enter your username</p>
        <div className="mb-5">
          <div className="user_name">
            <Input
              type="text"
              autoFocus={true}
              value={user}
              onChange={setUser}
              placeholder="Username"
            />
            <span className="domain">@mykloud.io</span>
          </div>
          <p className="note mt-3">Forgot your username?</p>
        </div>
        <button className="next_btn" onClick={() => setLogin("password")}>
          Next
        </button>
      </>
    );
  };

  const passwordLogin = () => {
    return (
      <>
        <h1 className="form_title">Welcome back!</h1>
        <p className="normal_text mb-10">{`${user}@mykloud.io`}</p>
        <div className="mb-5 relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            className="extra-padding"
            placeholder="password"
          />

          <button
            className="input_visibilty"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <u style={{ color: "#1565d8" }}>Show</u>
            ) : (
              <u style={{ color: "#1565d8" }}>Hide</u>
            )}
          </button>
          <p className="note mt-3">Forgot your password?</p>
        </div>
        <button className="next_btn">Login</button>
      </>
    );
  };

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

export default Login;
