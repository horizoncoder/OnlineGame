import React, { Fragment, useState } from "react";
import socket from "./socket";

function Message({ name, message }) {
  return (
    <tr>
      <td>
        <b>{name}</b>
      </td>
      <td>{message}</td>
    </tr>
  );
}

export default function () {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("message", { from: formData.name, message: formData.message });
    setFormData({ ...formData, message: "" });
  };

  socket.on("message", (data) => {
    setMessages([...messages, { name: data.from, message: data.message }]);
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <div className="form-group">
          <label value="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your Name"
            className="form-control"
            value={formData.name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <table className="table table-hover">
          <tbody>
            {messages.map((msg) => (
              <Message name={msg.name} message={msg.message} />
            ))}
          </tbody>
        </table>
        <div className="form-group">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Enter your Message"
            className="form-control"
            value={formData.message}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-success" onClick={sendMessage}>
          SEND
        </button>
      </div>
    </>
  );
}
