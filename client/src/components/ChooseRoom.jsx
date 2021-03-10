import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function () {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    history.push(`/room/${room}/${username}`);
  };
  console.log(username);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room ID"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usernmae"
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
