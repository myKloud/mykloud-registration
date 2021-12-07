import React from "react";

const Validation = (props) => {
  return (
    <>
      <div className="error">
        <p>{props.error}</p>
      </div>
    </>
  );
};

export default Validation;
