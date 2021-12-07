import React from "react";
import "./style.scss";
import blockImg from "../../images/block-user 1.png";

const Dob = () => {
  return (
    <>
      <div className="grid justify-items-center mt-56 mb-28 ">
        <img src={blockImg} alt="block" className="block_img" />
        <h1 className="title mt-7">
          Sorry we’re not able to complete your registration at this time.
        </h1>
        <p className="sub_title mt-4 mb-4">
          To sign up for a myKloud account,
          <p className="text-left">you must meet certain age requirements.</p>
        </p>
        <p className="sub_title2">
          To learn more, please visit our <u>Terms of Service</u> or the{" "}
          <u>FTC's Kids' Online Safety portal</u>.
        </p>
      </div>
    </>
  );
};

export default Dob;
