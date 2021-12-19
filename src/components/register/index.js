import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import icon from "../../images/lock 1.svg";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../common/input";
import SelectWrapper from "../common/selectWrapper";
import Validation from "../common/validation";
import { setUserObj } from "../../actions/userAction";
import Localization from "./localization";
import { setStorage } from "../../config/storage";
import "./style.scss";
import { checkUser } from "../../services/register";

const Register = (props) => {
  const mail_list = [
    { value: "@mykmail.io", label: "@mykmail.io" },
    { value: "@mykloudmail.io", label: "@mykloudmail.io" },
    { value: "@mkmail.io", label: "@mkmail.io" },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedMail, setSelectedMail] = useState(mail_list[0]);
  const [submit, setSubmit] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");
  const [isExist, setIsExist] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const form_validation = {
    username: {
      name: "username",
      required: Localization.validation.username.required,
      length: Localization.validation.username.length,
      pattern: Localization.validation.username.pattern,
      is_exist: Localization.validation.username.is_exist,
    },

    password: {
      name: "password",
      required: Localization.validation.password.required,
      length: Localization.validation.password.length,
      pattern: Localization.validation.password.patteren,
    },

    confirmPassword: {
      name: "confirmPassword",
      required: Localization.validation.confirmPassword.required,
      match: Localization.validation.confirmPassword.match,
    },
  };

  useEffect(() => {
    if (location.state) {
      setUser(location.state.backUser);
      setPassword(location.state.backPassword);
      setConfirmPassword(location.state.backPassword);
    }
  }, [location]);

  // useEffect(async () => {

  // }, [user.length > 0]);

  const isUserExist = async (value = user, selected = selectedMail) => {
    if (!value) {
      return;
    }
    const result = await checkUser(`${value}${selected.value}`);
    setIsExist(result.exists);
    if (result.exists) {
      setUserMessage(form_validation.username.is_exist);
    } else {
      setUserMessage("");
    }
  };

  const validate = (input, value) => {
    let is_valid = true;
    const validUser = new RegExp("^[a-z0-9.]+[a-z0-9]$");

    if (input.name === "username") {
      setUserMessage("");
      if (!value.length) {
        setUserMessage(input.required);
        is_valid = false;
      } else if (value.length < 4 || value.length > 30) {
        setUserMessage(input.length);
        is_valid = false;
      } else if (!validUser.test(value)) {
        setUserMessage(input.pattern);
        is_valid = false;
      } else if (isExist) {
        setUserMessage(form_validation.username.is_exist);
        is_valid = false;
      }
    }

    if (input.name === "password") {
      setPassMessage("");
      if (!value.length) {
        setPassMessage(input.required);
        is_valid = false;
      } else if (value.length < 8) {
        setPassMessage(input.length);
        is_valid = false;
      }
    }
    if (input.name === "confirmPassword") {
      setPassConfirmMessage("");
      if (!value.length) {
        setPassConfirmMessage(input.required);
        is_valid = false;
      } else if (password !== value) {
        setPassConfirmMessage(input.match);
        is_valid = false;
      }
    }

    return is_valid;
  };

  const validateHandler = () => {
    const is_valid_username = validate(form_validation.username, user);
    const is_valid_password = validate(form_validation.password, password);
    const is_valid_confirm_password = validate(
      form_validation.confirmPassword,
      confirmPassword
    );

    return (
      is_valid_username &&
      is_valid_password &&
      is_valid_confirm_password &&
      !isExist
    );
  };

  const nextPage = () => {
    setSubmit(true);
    const is_valid = validateHandler();

    if (is_valid) {
      const user_obj = props.userReducer;
      user_obj.username = user;
      user_obj.mail = selectedMail.value;
      user_obj.password = password;
      user_obj.is_valid = true;
      setUserObj(user_obj);
      setStorage("info");

      history.push({
        pathname: "/info",
        state: { user: user, password: password },
      });
    }
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="form_container register_container">
        <div className="form_wrapper">
          <h1 className="form_title">{Localization.title}</h1>
          <p className="normal_text mb-10">{Localization.sub_title}</p>

          <div className="input_wrapper">
            <div className="mb-6">
              <div className="user_name">
                <Input
                  type="text"
                  autoFocus={true}
                  value={user}
                  onChange={(e) => {
                    setUser(e);
                    validate(form_validation.username, e);
                  }}
                  onBlur={async (e) => {
                    isUserExist(e);
                  }}
                  placeholder={Localization.username_placeholder}
                  className={userMessage && "validation"}
                />
                <span className={`domain ${userMessage && "validation"}`}>
                  <SelectWrapper
                    value={selectedMail}
                    options={mail_list}
                    onChange={(e) => {
                      setSelectedMail(e);
                      isUserExist(user, e);
                    }}
                    className="username-dropdown"
                  />
                </span>
              </div>
              {userMessage && <Validation error={userMessage} />}
              {!submit ? (
                <p className="note mt-2">
                  {Localization.username_validation_general}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5 relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e);
                  validate(form_validation.password, e);
                }}
                className={`extra-padding ${passMessage && "validation"}`}
                placeholder={Localization.passowrd_placeholder}
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

              {passMessage && <Validation error={passMessage} />}
            </div>
            <div className=" relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e);
                  validate(form_validation.confirmPassword, e);
                }}
                className={`extra-padding ${
                  passConfirmMessage && "validation"
                }`}
                placeholder={Localization.confirm_passowrd_placeholder}
              />
              <button
                className="input_visibilty"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {!showConfirmPassword ? (
                  <u style={{ color: "#1565d8" }}>{Localization.show}</u>
                ) : (
                  <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
                )}
              </button>
              {passConfirmMessage && <Validation error={passConfirmMessage} />}
            </div>
            <button className="next_btn mt-8" onClick={nextPage}>
              {Localization.next}
            </button>
            <div className="safe_message mt-3">
              <img src={icon} alt="icon" />
              <p className="info ml-2">{Localization.msg}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ languageReducer, userReducer }) => ({
  languageReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
