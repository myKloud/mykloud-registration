import React, { useState } from "react";
import VerificationInput from "../common/verificationInput";
import "./style.scss";

const CodeVerification = () => {
  return (
    <>
      <div className="form_container verification_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-8">
            Enter code we’ve sent to 01012345678
          </h1>

          <VerificationInput />

          <div className="flex mt-4">
            <p className="info mr-1">Didn’t recieve a code?</p>
            <p className="action">Resend</p>
          </div>

          <div className="flex mt-4">
            <p className="info mr-1">Not your number?</p>
            <p className="action">Change</p>
          </div>

          <div className="flex mt-4 justify-between ...">
            <button className="pre">Previous</button>
            <button className="verify">Verify</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeVerification;
