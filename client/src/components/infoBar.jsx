import React from "react";
import "./App.css";

function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
        <button type="submit">exit</button>
      </div>
      <div className="rightInnerContainer" />
    </div>
  );
}

export default InfoBar;
