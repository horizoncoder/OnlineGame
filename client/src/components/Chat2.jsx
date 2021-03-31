import React, { useState } from "react";
import "./App.css";
import Game from "./Game";
import { socket } from "../store";
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";

function Chat2() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [datas, setDatas] = useState({});
  const [userName, setUserName] = useState("");

  // After Login
  const currentUser = AuthService.getCurrentUser();
  const updateTutorial = () => {
    const currentUser = AuthService.getCurrentUser();
    const data = {
      userid2: currentUser.username,
      status: "stoped",
    };
    RoomDataService.update(datas.id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const disconnectToRoom = () => {
    setLoggedIn(false);
    updateTutorial();
    document.location.reload();
    socket.emit("unjoin_room", room);
  };
  const saveRoom = () => {
    const currentUser = AuthService.getCurrentUser();
    const rooms = [];
    const data = {
      room,
      userid1: currentUser.username,
      status: "wait",
    };
    RoomDataService.create(data)
      .then((response) => {
        rooms.push(response.data);
        setDatas(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(rooms);
  };
  const add = () => {
    connectToRoom();
    saveRoom();
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
                onChange={(e) => {
                  setRoom(e.target.value);
                  setUserName(currentUser.username);
                }}
              />
            </div>
            <button type="submit" onClick={add}>
              Enter Chat
            </button>
          </div>
        ) : (
          <div>
            <Game userred={userName} room={room} roomids={datas.id} />
            <div>{room}</div>
            <div>{datas.id}</div>
            <div>{userName}</div>
            <button type="submit" onClick={disconnectToRoom}>
              Exit
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat2;
