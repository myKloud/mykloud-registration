import React, { useState } from "react";
import Validation from "./validation";

const Input = (props) => {
  const [has_value, set_value] = useState(false);
  const validUser = new RegExp("^[a-z0-9.]+[a-z0-9]$");

  const setValueHandler = (e) => {
    if (e.target.value) set_value(true);
    else set_value(false);
    props.onChange(e.target.value);
  };

  const validateInputRegister = (input) => {
    let error = "";

    if (input.name === "username") {
      debugger;
      if (!has_value) {
        error = input.required;
        props.check(false);
      } else if (props.value.length < 4 || props.value.length > 30) {
        error = input.length;
        props.check(false);
      } else if (!validUser.test(props.value)) {
        error = input.pattern;
        props.check(false);
      } else {
        debugger;
        props.check(true);
      }
    }
    if (input.name === "password") {
      if (!has_value) {
        error = input.required;
        props.check(false);
      } else if (props.value.length < 8) {
        error = input.length;
        props.check(false);
      } else {
        props.check(true);
      }
    }
    if (input.name === "confirmPassword") {
      if (!has_value) {
        error = input.required;
        props.check(false);
      } else if (props.password !== props.confirmPassword) {
        error = input.match;
        props.check(false);
      } else {
        props.check(true);
      }
    }

    return (
      <>
        <Validation error={error} />
      </>
    );
  };

  const validateInputClient = (input) => {
    if (input.name === "name") {
      if (!props.firstName.length && !props.lastName.length) {
        props.error(input.requiredBoth);
        props.check(false);
      } else if (!props.firstName.length) {
        props.error(input.requiredFirst);
        props.check(false);
      } else if (!props.lastName.length) {
        props.error(input.requiredLast);
        props.check(false);
      } else {
        props.check(true);
      }
    }

    if (input.name === "birth") {
      if (!props.month.length) {
        props.error(input.required);
        props.check(false);
      } else if (!props.year.length) {
        props.error(input.required);
        props.check(false);
      } else {
        props.check(true);
      }
    }
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
        />

        <label className={`form_label ${has_value ? "filled" : ""}`}>
          {props.placeholder}
        </label>
        {props.submitRegister ? validateInputRegister(props.message) : ""}
        {props.submitClientInfo ? validateInputClient(props.message) : ""}
      </div>
    </>
  );
};

export default Input;
