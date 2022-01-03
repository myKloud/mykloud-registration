import Input from "../common/input";
import SelectWrapper from "../common/selectWrapper";
import Validation from "../common/validation";
import nextPage from "./nextPage";
import isUserExist from "./isUserExist";
import validate from "./validate";
import validateHandler from "./validateHandler";
import formValidation from "./formValidation";
import { setUserObj } from "../../actions/userAction";
import Localization from "./localization";
import { setStorage } from "../../shared/storage";
import { checkUser } from "../../services/register";
import "./Register.scss";
import icon from "../../assets/images/lock 1.svg";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";


const Register = (props) => {
  const mailList = [
    { value: "@mykmail.io", label: "@mykmail.io" },
    { value: "@mykloudmail.io", label: "@mykloudmail.io" },
    { value: "@mkmail.io", label: "@mkmail.io" },
  ];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedMail, setSelectedMail] = useState(mailList[0]);
  const [submit, setSubmit] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");
  const [isExist, setIsExist] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const userObj = props.userReducer;

  useEffect(() => {
    if (location.state) {
      setUser(location.state.backUser);
      setPassword(location.state.backPassword);
      setConfirmPassword(location.state.backPassword);
    }
  }, [location]);

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="form_container register_container">
        <div className="form_wrapper">
          <h1 className="form_title">{Localization.title}</h1>
          <p className="normal_text mb-10">{Localization.subTitle}</p>

          <div className="input_wrapper">
            <div className="mb-6">
              <div className="user_name">
                <Input
                  type="text"
                  autoFocus={true}
                  value={user}
                  onChange={(e) => {
                    setUser(e);
                    validate(formValidation.username, e , setUserMessage,
                      setPassMessage,
                      formValidation,
                      setPassConfirmMessage,
                      password , 
                      confirmPassword, 
                      isExist);
                      setUserMessage("");
                  }}
                  onBlur={ (e) => {
                    isUserExist(e ,
                      selectedMail,
                      checkUser,
                      setIsExist,
                      setUserMessage,
                      formValidation);
            
                      validate(formValidation.username, e , setUserMessage,
                        setPassMessage,
                        formValidation,
                        setPassConfirmMessage,
                        password , 
                        confirmPassword, 
                        isExist);
                  }}
                  placeholder={Localization.usernamePlaceholder}
                  className={userMessage && "validation"}
                />
                <span className={`domain ${userMessage && "validation"}`}>
                  <SelectWrapper
                    value={selectedMail}
                    options={mailList}
                    onChange={(e) => {
                      setSelectedMail(e);
                      isUserExist(user, e, checkUser,
                        setIsExist,
                        setUserMessage,
                        formValidation);
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
                type={"text"}
                value={password}
                onChange={(e) => {
                  setPassword(e);
                  validate(formValidation.password, e , setUserMessage,
                    setPassMessage,
                    formValidation,
                    setPassConfirmMessage,
                    password , 
                    confirmPassword, 
                    isExist);
                    setPassMessage("")
                    setPassConfirmMessage("")
                }}
                onBlur={ (e) => {
                  validate(formValidation.password, e , setUserMessage,
                    setPassMessage,
                    formValidation,
                    setPassConfirmMessage,
                    password , 
                    confirmPassword, 
                    isExist);
                }}
                className={`extra-padding ${passMessage && "validation"} ${
                  !showPassword && "password-mask"
                }`}
                placeholder={Localization.passowrdPlaceholder}
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
                type={"text"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e);
                  validate(formValidation.confirmPassword, e , setUserMessage,
                    setPassMessage,
                    formValidation,
                    setPassConfirmMessage,
                    password , 
                    confirmPassword, 
                    isExist);
                    setPassConfirmMessage("")
                }}
                onBlur={ (e) => {
                  validate(formValidation.confirmPassword, e , setUserMessage,
                    setPassMessage,
                    formValidation,
                    setPassConfirmMessage,
                    password , 
                    confirmPassword, 
                    isExist);
                }}

                className={`extra-padding ${
                  passConfirmMessage && "validation"
                } ${!showConfirmPassword && "password-mask"}`}
                placeholder={Localization.confirmPassowrdPlaceholder}
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
            <button className="next_btn mt-8" onClick={() => nextPage(setSubmit,
            validateHandler,
            userObj,
            setUserObj,
            setStorage,
            history,
            user,
            password,
            selectedMail,validate,
            formValidation,
            setUserMessage,
            setPassMessage,
            setPassConfirmMessage,
            confirmPassword,
            isExist)}>
              {Localization.next}
            </button>
            <div className="safe_message mt-3">
              <img src={icon} alt="icon" className="icon" />
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