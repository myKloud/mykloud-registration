import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import blockImg from "../../images/block-user 1.png";
import Localization from "./localization";

const Dob = (props) => {
  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="grid justify-items-center  dob_container">
        <img src={blockImg} alt="block" className="block_img" />
        <h1 className="title mt-7">{Localization.title}</h1>
        <p className="sub_title mt-4 mb-4">
          {Localization.sub_title}
          <p className="text-left">{Localization.age}</p>
        </p>
        <p className="sub_title2">
          {Localization.learn_more} <u>{Localization.terms}</u>
          {Localization.or}
          <u>{Localization.safety_portal}</u>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dob);
