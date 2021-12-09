import React, { useState } from "react";
import Select from "react-select";

const SelectWrapper = (props) => {
  const [has_value, set_value] = useState(false);

  const setValueHandler = (e) => {
    if (e.value) set_value(true);
    else set_value(false);
    props.onChange(e);
  };

  return (
    <>
      <div
        className={`select-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <Select
          defaultValue={props.value}
          // value={props.value}
          className={`${props.className ? props.className : ""}`}
          onChange={(e) => {
            setValueHandler(e);
          }}
          options={props.options}
          isSearchable={false}
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

export default SelectWrapper;
