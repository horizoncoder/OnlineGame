import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";

export default class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.state = {
       currentRoom: null,
      rooms: [],
      status: "",
    };
  }

  setActiveRoom(room) {
    this.setState({
      currentRoom: room,
    });
  }

  updateTutorial() {
    const data = {
      status: "game stoped",
    };
    RoomDataService.update(this.props.roomid, data)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let a = false;
    if (this.props.users.length === 1) {
      a = true;
    }
    if (a === true) {
      this.updateTutorial();
    }
    console.log(a);
    console.log(this.props.roomid);
    return (
      <>
        <div className="infoBar">
          <div className="leftInnerContainer">
            <h3>{this.props.room}</h3>
            <Link to="/rooms">
              <button onClick={() => this.updateTutorial()} type="submit">
                exit
              </button>
            </Link>
          </div>
          <div className="rightInnerContainer" />
        </div>
      </>
    );
  }
}
