import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Game from "./Game";
import { socket } from "../store";
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";
import { updateTutorial } from "./ListRoom";

function BluePlayerconnect(props) {
  const updateTutorial = () => {
    const currentUser = AuthService.getCurrentUser();
    const data = {
      userid2: currentUser.username,
      status: "started",
    };
    RoomDataService.update(props.roomid, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(props);
  // console.log(romsi)
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };
  const disconnectToRoom = () => {
    setLoggedIn(false);
    setRoom("sdjsj");
    socket.emit("unjoin_room", room);
  };

  const sendMessage = async () => {};
  const saveRoom = () => {
    const currentUser = AuthService.getCurrentUser();
    const rooms = [];
    const data = {
      room,
      userid1: currentUser.username,
      status: "wait",
      roomid: 100,
    };
    RoomDataService.create(data)
      .then((response) => {
        rooms.push(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(rooms);
  };
  const add = (rooms) => {
    setRoom(props.roomsi);
    setUserName(currentUser.username);
    connectToRoom();
    console.log(rooms);
    updateTutorial();
  };

  return (
    <>
      <div className="App">
        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Room..."
                value={props.roomsi}
                onMouseEnter={(e) => {
                  setRoom(props.roomsi);
                  setUserName(currentUser.username);
                }}
              />
            </div>
            <button onClick={add}>Enter Chat</button>
          </div>
        ) : (
          <div>
            <Game room={room} />
            <div>{room}</div>
            <div>{userName}</div>
            <button onClick={disconnectToRoom}>Exit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default BluePlayerconnect;
