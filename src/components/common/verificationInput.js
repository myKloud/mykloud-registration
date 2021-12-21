import React from "react";
import Verification from "react-verification-input";

const VerificationInput = (props) => {
  return (
    <>
      <Verification
        removeDefaultStyles
        length={5}
        placeholder={""}
        onChange={(value) => {
          props.setCode(value);
          props.setError(() => "");
        }}
        classNames={{
          container: "container",
          character: props.character || "character",
          characterInactive: "character--inactive",
          characterSelected: "character--selected",
        }}
        inputProps={{
          onPaste: (e) => {
            e.preventDefault();
            return false;
          },
          onCopy: (e) => {
            e.preventDefault();
            return false;
          },
        }}
      />
    </>
  );
};

export default VerificationInput;
