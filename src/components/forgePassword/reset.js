import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../common/input";
import "./style.scss";
import { connect } from "react-redux";
import Localization from "./localization";

const Reset = (props) => {
  const history = useHistory();

  const next = () => {
    history.push("/login");
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <div className="form_container forget_password_form">
      <div className="form_wrapper">
        <h1 className="form_title mb-7 ">{Localization.reset_title}</h1>
        <p
          className="form_subtitle mb-7 text-center"
          style={{ width: "385px", marginLeft: "45px" }}
        >
          {Localization.reset_sub_title}
        </p>
        <div className=" relative ">
          <Input
            type={props.showPassword ? "text" : "password"}
            autoFocus={true}
            value={props.newPassword}
            onChange={props.setNewPassword}
            className="recovery_input mb-7"
            placeholder={Localization.create_placeholder}
          />

          <button
            className="input_visibilty"
            onClick={() => props.setShowPassword(!props.showPassword)}
          >
            {!props.showPassword ? (
              <u style={{ color: "#1565d8" }}>{Localization.show}</u>
            ) : (
              <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
            )}
          </button>
        </div>

        <div className=" relative ">
          <Input
            type={props.showConfirmPassword ? "text" : "password"}
            value={props.confirmPassword}
            onChange={props.setConfirmPassword}
            className="recovery_input mb-7"
            placeholder={Localization.confirm_placeholder}
          />

          <button
            className="input_visibilty"
            onClick={() =>
              props.setShowConfirmPassword(!props.showConfirmPassword)
            }
          >
            {!props.showConfirmPassword ? (
              <u style={{ color: "#1565d8" }}>{Localization.show}</u>
            ) : (
              <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
            )}
          </button>
        </div>

        <button className="next_btn" onClick={next}>
          {Localization.next}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ languageReducer }) => ({
  languageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
