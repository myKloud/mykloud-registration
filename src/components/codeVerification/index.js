import React from "react";
import { connect } from "react-redux";
import VerificationInput from "../common/verificationInput";
import { useHistory } from "react-router-dom";
import "./style.scss";
import Localization from "./localization";
import { removeStorage, setStorage } from "../../config/storage";

const CodeVerification = (props) => {
  const history = useHistory();
  const pre = () => {
    setStorage("recovery");
    history.push({
      pathname: "/recovery",
    });
  };

  const verifyCode = () => {
    removeStorage();
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="form_container verification_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-8">
            {`${Localization.title} 01012345678`}
          </h1>

          <VerificationInput />

          <div className="flex mt-4">
            <p className="info mr-1">{Localization.not_recieve}</p>
            <p className="action">{Localization.resend}</p>
          </div>

          <div className="flex mt-4">
            <p className="info mr-1">{Localization.not_your_number}</p>
            <p className="action">{Localization.change}</p>
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
