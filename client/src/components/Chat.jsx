import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import PropTypes from "prop-types";
import "./App.css";
import InfoBar from "./infoBar";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import TextContainer from "./TextContainer";
import Game from "./Game";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => {
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => sendMessage());
    }
  };
  const test = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", message, () => alert("dsdds"));
  };

  console.log(message, messages);
  return (
    <div className="outContainer">
      <div className="container">
        <Game />
        <InfoBar room={room} users={users} />
        <Messages messages={messages} name={name} />
        <InputMessage
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <button className="sendButton" onClick={(e) => test(e)} type="submit">
        test
      </button>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
Chat.propTypes = {
  search: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
