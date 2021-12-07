import React from "react";
import { connect } from "react-redux";
import "./style.scss";
import blockImg from "../../images/block-user 1.png";
import Localization from "./localization";

const Dob = (props) => {
  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="grid justify-items-center mt-56 mb-28 ">
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
