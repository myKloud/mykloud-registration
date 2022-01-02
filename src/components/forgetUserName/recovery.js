import React, { useState, useEffect } from "react";
import Input from "../common/input";
import "./style.scss";
import Fullname from "./fullname";
import Verification from "../verification";
import { connect } from "react-redux";
import Localization from "./localization";

const Recovery = (props) => {
  const [email, setEmail] = useState("");
  // const [submit, setSubmit] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [stage, setStage] = useState("recovery");

  const next = () => {
    setStage("fullname");
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  const recovery = () => {
    return (
      <div className="form_container forget_user_form">
        <div className="form_wrapper">
          <h1 className="form_title mb-7 ">{Localization.title}</h1>
          <p className="form_subtitle mb-7 text-center">
            {Localization.recovery_sub_title}
          </p>

          <Input
            type="text"
            autoFocus={true}
            value={email}
            onChange={setEmail}
            className="recovery_input mb-7"
            placeholder={Localization.recovery_placeholder}
          />

          <button className="next_btn" onClick={next}>
            {Localization.next}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {stage === "recovery" ? recovery() : ""}

      {stage === "fullname" ? (
        <Fullname
          firstName={first}
          lastName={last}
          setFirst={setFirst}
          setLast={setLast}
          setStage={setStage}
        />
      ) : (
        ""
      )}

      {stage === "verification" ? (
        <Verification push="/login" setStage={setStage} recovery={email} />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = ({ languageReducer }) => ({
  languageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);
