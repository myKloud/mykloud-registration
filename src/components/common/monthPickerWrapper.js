import React, { useState } from "react";
import { MonthPicker } from "react-dropdown-date";

const MonthPickerWrapper = (props) => {
  const [has_value, set_value] = useState(false);

  const setValueHandler = (month) => {
    if (month) set_value(true);
    else set_value(false);

    props.onChange(month);
  };

  return (
    <>
      <div
        className={`input-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <MonthPicker
          classes={`select-months form_field ${
            props.className ? props.className : ""
          }`}
          caps
          required={props.required || false}
          disabled={props.disabled || false}
          onChange={(month) => setValueHandler(month)}
        />
        <label className={`form_label ${has_value ? "filled" : ""}`}>
          {props.placeholder}
        </label>
      </div>
    </>
  );
};

export default MonthPickerWrapper;
