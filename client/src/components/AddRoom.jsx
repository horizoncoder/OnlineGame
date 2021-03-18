import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";

export default class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.newRoom = this.newRoom.bind(this);
    const currentUser = AuthService.getCurrentUser();
    this.state = {
      room: "",
      rooms: [],
      roomid: 100,
      userid1: currentUser.username,
      status: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      room: e.target.value,
    });
  }

  saveRoom() {
    const currentUser = AuthService.getCurrentUser();
    const { room, rooms } = this.state;

    const data = {
      room,
      userid1: currentUser.username,
      status: "wait",
      roomid: 100,
    };

    RoomDataService.create(data)
      .then((response) => {
        this.setState({
          rooms: rooms.push(response.data),
        });
        rooms.push(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(rooms);
  }

  newRoom() {
    this.setState({
      room: "",
    });
  }

  render() {
    const { room, roomid, userid1 } = this.state;
    return (
      <div className="submit-form">
        <div>
          <div className="form-group">
            <h2>RoomName</h2>
            <input
              type="text"
              className="form-control"
              id="room"
              required
              value={room}
              onChange={this.onChangeTitle}
              name="room"
            />
          </div>
          <Link to={`/chat?name=${userid1}&room=${room}&roomid=${roomid}`}>
            <button
              onClick={this.saveRoom}
              className="btn btn-success"
              type="submit"
            >
              CreateRoom
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
