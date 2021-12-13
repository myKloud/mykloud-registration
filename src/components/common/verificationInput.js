import React from "react";
import Verification from "react-verification-input";

const VerificationInput = (props) => {
  return (
    <>
      <Verification
        removeDefaultStyles
        length={5}
        placeholder={""}
        onChange={(value) => props.setCode(value)}
        classNames={{
          container: "container",
          character: "character",
          characterInactive: "character--inactive",
          characterSelected: "character--selected",
        }}
      />
    </>
  );
};

export default VerificationInput;
