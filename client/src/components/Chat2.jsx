import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Game from "./Game";
import { socket } from "../store";
const CONNECTION_PORT = "localhost:5000/";

function Chat2() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("action", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("switch", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <>
      <Game />
      <div className="App">
        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Name..."
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room..."
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <button onClick={connectToRoom}>Enter Chat</button>
          </div>
        ) : (
          <div className="chatContainer">
            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author == userName ? "You" : "Other"}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="messageInputs">
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat2;
