import React from "react";
import "./App.css";

const RoomsInfo = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>Connected People</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ room }) => (
              <div key={room} className="activeItem">
                <h1>{room}</h1>
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default RoomsInfo;