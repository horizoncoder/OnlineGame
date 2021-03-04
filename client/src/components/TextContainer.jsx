import React from "react";
import "./App.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>Connected People</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name , room }) => (
              <div key={name} className="activeItem">
                <h1>{name}</h1>
                <h1> {room}</h1>
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
