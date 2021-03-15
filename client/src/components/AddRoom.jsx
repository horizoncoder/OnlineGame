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
      userid1: currentUser.id,
    };
  }

  onChangeTitle(e) {
    this.setState({
      room: e.target.value,
    });
  }

  saveRoom() {
    const currentUser = AuthService.getCurrentUser();
<<<<<<< HEAD
    const { room } = this.state;

    const data = {
      room,
      userid1: currentUser.id,
=======
    const { room,userid1,userid2 } = this.state;
    
    const data = {
      room,
       userid1:currentUser.id ,

>>>>>>> de0a04b72e41915e5429ad4a311859de942cf193
    };

    RoomDataService.create(data)
      .then((response) => {
        this.setState({
          room: response.data.room,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newRoom() {
    this.setState({
      room: "",
    });
  }

  render() {
    const { room } = this.state;
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
            />
          </div>
          <Link to={`/chat?name=${currentUser.id}&room=${room}`}>
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
