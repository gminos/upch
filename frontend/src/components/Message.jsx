import React from "react";

function Message({ text }) {
  return (
    <p className="message text-center text-cyan-400 font-medium mb-4">{text}</p>
  );
}

export default Message;
