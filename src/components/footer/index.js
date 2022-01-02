import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import twitter from "../../assets/images/twitter.png";
import linked from "../../assets/images/linkedin.png";
import Localization from "./localization";

const Footer = (props) => {
  const generateLink = (name) => {
    if (name === "twitter") {
      window.open("https://twitter.com/mykloudplatform", "_blank");
    } else if (name === "linked") {
      window.open(
        "https://www.linkedin.com/company/mykloud/mycompany/",
        "_blank"
      );
    }
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="footer">
        <div className="first_line">
          <div className="footer_logo" />
          <div className="link_container">
            <a href="https://twitter.com/mykloudplatform" className="mr-8">
              {Localization.terms}
            </a>
            <a href="https://twitter.com/mykloudplatform">
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
