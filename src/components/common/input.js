import React, { useState } from "react";

const Input = (props) => {
  const [has_value, set_value] = useState(false);

  const setValueHandler = (e) => {
    if (e.target.value) set_value(true);
    else set_value(false);
    props.onChange(e.target.value);
  };

  return (
    <>
      <div
        className={`input-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <input
          type={props.type}
          className={`form_field ${props.className ? props.className : ""}`}
          autoFocus={props.autoFocus || false}
          value={props.value}
          onChange={(e) => {
            setValueHandler(e);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e.currentTarget.value);
          }}
          maxlength="128"
        />

        {props.placeholder && (
          <label
            className={`form_label ${
              has_value || props.value ? "filled" : ""
            } `}
          >
            {props.placeholder}
          </label>
        )}
      </div>
    </>
  );
};

export default Input;
