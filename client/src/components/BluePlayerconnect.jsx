import React, { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Game from "./Game";
import { socket } from "../store";
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";

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

  const add = (rooms) => {
    setRoom(props.roomsi);
    setUserName(currentUser.username);
    connectToRoom();
    console.log(rooms);
    updateTutorial();
  };
  const { roomsi } = props;
  return (
    <>
      <div className="App">
        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              room:
              <input
                type="text"
                placeholder="Room..."
                value={roomsi}
                onMouseEnter={() => {
                  setRoom(props.roomsi);
                  setUserName(currentUser.username);
                }}
              />
            </div>
            <button type="submit" onClick={add}>
              Connect
            </button>
          </div>
        ) : (
          <div>
            <Game userblue={currentUser.username} room={room} />
            <div>{room}</div>
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
BluePlayerconnect.propTypes = {
  roomsi: PropTypes.string.isRequired,
  roomid: PropTypes.number.isRequired,
};
export default BluePlayerconnect;
