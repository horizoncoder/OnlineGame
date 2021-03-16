import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./App.css";
import InfoBar from "./infoBar";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import TextContainer from "./TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomid, setRoomid] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room, roomid } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    setRoomid(roomid);

    socket.emit("join", { name, room, roomid }, () => {});
    socket.on("roomData", ({ users })=>{
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
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);
  return (
    <div className="outContainer">
      <div className="container">
        <InfoBar room={room} users={users}/>
        <Messages messages={messages} name={name} />
        <InputMessage
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
