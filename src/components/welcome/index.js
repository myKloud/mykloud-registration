import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import blockImg from "../../images/myKloud_icon.png";
import Localization from "./localization";

const Welcome = (props) => {
  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="grid justify-items-center mt-32 mb-28 welcome_container">
        <img src={blockImg} alt="block" className="block_img" />
        <h1 className="title">{Localization.title}</h1>
        <p className="sub_title mt-4 mb-2">{Localization.sub_title}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
