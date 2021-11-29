import React, { useState } from "react";
import Verification from "react-verification-input";

const VerificationInput = (props) => {
  const setValueHandler = (month) => {
    props.onChange(month);
  };

  return (
    <>
      {/* <div
          className={`input-container ${
            props.containerClassName ? props.containerClassName : ""
          }`}
        > */}
      <Verification
        removeDefaultStyles
        length={5}
        placeholder={""}
        classNames={{
          container: "container",
          character: "character",
          characterInactive: "character--inactive",
          characterSelected: "character--selected",
        }}
      />
      {/* </div> */}
    </>
  );
};

export default VerificationInput;
