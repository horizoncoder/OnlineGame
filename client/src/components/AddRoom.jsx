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
      roomid: "",
      userid1: currentUser.id,
      status: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      room: e.target.value,
      roomid: "",
    });
  }

  saveRoom() {
    const currentUser = AuthService.getCurrentUser();
    const { room, rooms, roomid } = this.state;

    const data = {
      room,
      userid1: currentUser.id,
      status: "wait",
    };

    RoomDataService.create(data)
      .then((response) => {
        this.setState({
          rooms: rooms.push(response.data)
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
    const { room, roomid } = this.state;
    const { rooms} = this.state;
    console.log({ rooms });
    const currentUser = AuthService.getCurrentUser();
    return (
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="room">RoomName</label>
            <input
              type="text"
              className="form-control"
              id="room"
              required
              value={room}
              onChange={this.onChangeTitle}
              name="room"
              roomid="room"
            />
          </div>
          <Link
            to={`/chat?name=${currentUser.id}&room=${room}&roomid=${rooms.id}`}
          >
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
