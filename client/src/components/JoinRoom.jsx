import React, { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Game from "./Game";
import { socket } from "../store";
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";

function JoinRoom(props) {
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
    socket.emit("join_room2", room,userName);
  };
  const disconnectToRoom = () => {
    document.location.reload();
    socket.emit("unjoin_room", room);
  };

  const add = (rooms) => {
    setRoom(props.roomsi);
    setUserName(currentUser.username);
    connectToRoom();
    console.log(rooms);
    // updateTutorial();
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
JoinRoom.propTypes = {
  roomsi: PropTypes.string.isRequired,
  roomid: PropTypes.number.isRequired,
};
export default JoinRoom;
