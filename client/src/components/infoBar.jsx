import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: null,
      rooms: [],
      status: "",
    };
  }

  render() {
    const { room } = this.props;
    return (
      <>
        <div className="infoBar">
          <div className="leftInnerContainer">
            <h3>{room}</h3>
            <Link to="/rooms">
              <button type="submit">exit</button>
            </Link>
          </div>
          <div className="rightInnerContainer" />
        </div>
      </>
    );
  }
}
InfoBar.propTypes = {
  room: PropTypes.string.isRequired,
};
