import React, { useState, useContext } from "react";
import { css } from "./footer.css";
import { MessageContext } from "../content";
const Footer = () => {
  const [text, setText] = useState("");
  const [message, setMessages] = useContext(MessageContext);
  return (
    <div className="footer">
      <input
        className="inp"
        placeholder="Type something..."
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setMessages((message) => [
              ...message,
              { text: text, status: "send" },
            ]);
          }
        }}
      />
    </div>
  );
};

export default Footer;
