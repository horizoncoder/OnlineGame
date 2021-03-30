import React, { useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Game from "./Game";
import { socket } from "../store";
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";

function Chat2() {
  const updateTutorial = (props) => {
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
    updateTutorial();
    socket.emit("unjoin_room", room);
  };
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
            <Game room={room} />
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
const mapStateToProps = ({ Counter }) => {
  const { numBlue, numRed } = Counter;
  return {
    numBlue,
    numRed,
  };
};
Chat2.propTypes = {
  roomid: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Chat2);
