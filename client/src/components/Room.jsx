import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

let socket;

export default function () {
  const { id, username } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomId, setRoomId] = useState(null);
  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.emit("join-room", {
      roomId: id,
      username,
    });
    const handler = (data) => {
      setUsers(data.users);
      setRoomId(data.id);
    };
    socket.on("roomData", handler);
    return () => {
      socket.emit("leave-room", {
        roomId,
        user: username,
      });
      socket.off("roomData", handler);
      socket.disconnect();
    };
  }, [id, roomId, username]);
  useEffect(() => {
    const handler = (data) => {
      console.log(data);
      setMessages([...messages, data.message]);
    };
    socket.on("message", handler);
    return () => {
      socket.off("message", handler);
    };
  }, [messages]);
  const sendMessage = (event) => {
    event.preventDefault();
    if (!message) return;
    socket.emit("message", {
      username,
      text: message,
      roomId,
    });
    console.log(roomId);
    setMessage("");
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>Users</h1>
        <div>
          {users.map((user, index) => (
            <div>{user}</div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ height: "500px", overflowY: "auto" }}>
          {messages.map((message, index) => (
            <div>
              {message.username}
              say:
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
        </form>
      </div>
    </div>
  );
}
