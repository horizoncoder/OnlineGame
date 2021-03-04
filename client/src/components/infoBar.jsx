import React from "react";
import "./App.css";

function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer"></div>
    </div>
  );
}

export default InfoBar;
