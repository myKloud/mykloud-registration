import React from "react";
import { connect } from "react-redux";
import VerificationInput from "../common/verificationInput";
import { useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import Localization from "./localization";
import { removeStorage, setStorage } from "../../config/storage";

const CodeVerification = (props) => {
  const location = useLocation();
  const recovery = props.recovery || location.state.value || "01012345678";
  let timer = 60;
  // const changeTimer = (e) => {
  //   props.onChange(e - 1);
  // };

  const history = useHistory();
  const pre = () => {
    setStorage("recovery");
    if (props.setStage) {
      props.setStage("recovery");
    } else {
      history.push({
        pathname: "/recovery",
      });
    }
  };

  const verifyCode = () => {
    removeStorage();
    if (props.push) {
      history.push({
        pathname: props.push,
      });
    }
    if (props.resetPass) {
      props.setStage("reset");
    }
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="form_container verification_container">
        <div className="form_wrapper">
          <h1 className="form_title">{`${Localization.title}`}</h1>
          <p className="subtitle mb-8">{recovery}</p>

          <div className="input_wrapper">
            <VerificationInput />

            <div className="flex mt-4">
              <p className="info mr-1">{Localization.not_recieve}</p>
              {true ? (
                <>
                  <p className="timer">{`Wait for 00:${timer} sec`}</p>
                </>
              ) : (
                <p className="action">{Localization.resend}</p>
              )}
            </div>

            <div className="flex mt-4">
              <p className="info mr-1">{Localization.not_your_number}</p>
              <p className="action" onClick={pre}>
                {Localization.change}
              </p>
            </div>

            <div className="flex mt-4 justify-between ...">
              <button className="pre" onClick={pre}>
                {Localization.previous}
              </button>
              <button className="verify" onClick={verifyCode}>
                {Localization.verify}
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
