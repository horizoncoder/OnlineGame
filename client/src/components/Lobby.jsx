import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./App.css";
import InfoBar from "./infoBar";
import RoomsInfo from "./RoomsInfo";

let socket;

const Lobby = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
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

  return (
    <div className="outContainer">
      <div className="container">
        <InfoBar room={room} />
      </div>
      <RoomsInfo users={users} />
    </div>
  );
};

export default Lobby;
