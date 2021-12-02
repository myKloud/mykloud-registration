import React from "react";
import "./style.scss";
import twitter from "../../images/twitter.png";
import linked from "../../images/linked in.png";

const Footer = () => {
  const generateLink = (name) => {
    if (name === "twitter") {
      window.location = "https://twitter.com/mykloudplatform";
    } else if (name === "linked") {
      window.location = "https://www.linkedin.com/company/mykloud/mycompany/";
    } else {
      window.location = "localhost:3000";
    }
  };
  return (
    <>
      <div className="footer">
        <div className="first_line">
          <div className="footer_logo" />
          <div className="link_container">
            <a href="https://twitter.com/" className="mr-8">
              Terms of Service
            </a>
            <a href="https://twitter.com/" className="mr-8">
              Privacy Policy
            </a>
            <a href="https://twitter.com/">Contact Us</a>
          </div>
        </div>
        <div className="second_line mt-8">
          <p className="copyright">
            Copyright © 2021. All rights reserved by myKloud Company.
          </p>

          <div className="flex">
            <p className="join mr-6">Join our community</p>
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

export default Footer;
