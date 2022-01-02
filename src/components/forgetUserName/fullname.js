import React, { useEffect } from "react";
import Input from "../common/input";
import "./style.scss";
import { connect } from "react-redux";
import Localization from "./localization";

const Fullname = (props) => {
  const next = () => {
    props.setStage("verification");
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <div className="form_container forget_user_form">
      <div className="form_wrapper">
        <h1 className="form_title mb-7 ">{Localization.title}</h1>
        <p className="form_subtitle mb-7 text-center">
          {Localization.fullname_sub_title}
        </p>
        <Input
          type="text"
          autoFocus={true}
          value={props.first}
          onChange={props.setFirst}
          className="recovery_input mb-7"
          placeholder={Localization.firstname_placeholder}
        />

        <Input
          type="text"
          value={props.last}
          onChange={props.setLast}
          className="recovery_input mb-7"
          placeholder={Localization.lastname_placeholder}
        />

        <p className="note mb-7">{Localization.fullname_message}</p>

        <button className="next_btn" onClick={next}>
          {Localization.fullname_btn}
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

export default connect(mapStateToProps, mapDispatchToProps)(Fullname);
