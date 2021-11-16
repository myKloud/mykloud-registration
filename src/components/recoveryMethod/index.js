import React, { useState } from "react";
import { css } from "./recoveryMethod.css";
import { Icon } from "@iconify/react";

const RecoveryMethod = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  return (
    <>
      <div className="recoveryForm">
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            height: "60%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "0px",
            }}
          >
            <h1 className="recoveryFormTitle">Welcome, Monica!</h1>
            <p style={{ fontSize: "27px" }}>👋</p>
          </div>

          <p className="recoveryFormSubtitle">
            Your myKloud account has been created succesfully.
          </p>
        </div>
        <p className="recoveryFormSubtitle2">
          For now , let’s select your recovery method
        </p>

        <div className="buttonContainer">
          <div className="email"></div>
          <div className="phone"></div>
        </div>
      </div>
    </>
  );
};

export default RecoveryMethod;
