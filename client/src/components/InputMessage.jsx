import React from "react";
import PropTypes from "prop-types";
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
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button
      className="sendButton"
      onClick={(e) => sendMessage(e)}
      type="submit"
    >
      Send
    </button>
  </form>
);

export default InputMessage;
InputMessage.propTypes = {
  setMessage: PropTypes.string.isRequired,
  sendMessage: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
