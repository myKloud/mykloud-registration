import React from "react";
import { connect } from "react-redux";
import "./style.scss";
import twitter from "../../images/twitter.png";
import linked from "../../images/linked in.png";
import Localization from "./localization";

const Footer = (props) => {
  const generateLink = (name) => {
    if (name === "twitter") {
      window.location = "https://twitter.com/mykloudplatform";
    } else if (name === "linked") {
      window.location = "https://www.linkedin.com/company/mykloud/mycompany/";
    }
  };
  //

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="footer">
        <div className="first_line">
          <div className="footer_logo" />
          <div className="link_container">
            <a href="https://twitter.com/" className="mr-8">
              {Localization.terms}
            </a>
            <a href="https://twitter.com/" className="mr-8">
              {Localization.privacy}
            </a>
          </div>
        </div>
        <div className="second_line mt-8">
          <p className="copyright">{Localization.copyright}</p>

          <div className="flex">
            <p className="join mr-6">{Localization.join_community}</p>
            <img
              src={twitter}
              alt="twitter"
              className="mr-3"
              onClick={() => generateLink("twitter")}
            />
            <img
              alt="linked"
              src={linked}
              onClick={() => generateLink("linked")}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
