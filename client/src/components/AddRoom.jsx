import React, { useState } from "react";
import "./App.css";
import Game from "./Game";
import { socket } from "../store";
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";

function AddRoom() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [datas, setDatas] = useState({});
  const [userName, setUserName] = useState("");

  // After Login
  const currentUser = AuthService.getCurrentUser();
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room,userName);
  };

  const disconnectToRoom = () => {
    setLoggedIn(false);
    //updateTutorial();
    document.location.reload();
    socket.emit("unjoin_room", room);
  };

  const add = () => {
    connectToRoom();
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
              Create Room
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

export default AddRoom;
