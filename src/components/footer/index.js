import React from "react";
import "./style.scss";
import twitter from "../../images/twitter.png";
import linked from "../../images/linked in.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="first_line">
          <div className="footer_logo" />
          <div className="link_container">
            <a className="mr-8">Terms of Service</a>
            <a className="mr-8">Privacy Policy</a>
            <a>Contact Us</a>
          </div>
        </div>
        <div className="second_line mt-8">
          <p className="copyright">
            Copyright © 2021. All rights reserved by myKloud Company.
          </p>

          <div className="flex">
            <p className="join mr-6">Join our community</p>
            <img src={twitter} className="mr-3" />
            <img src={linked} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
