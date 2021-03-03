import React from 'react';

import "./App.css";

const InputMessage = ({ setMessage, message, sendMessage }) => (
  <form className="form">
    <input
      type="text"
      className="input"
      placeholder="Type your message here ..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default InputMessage;
