import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";

export default class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchRoom = this.onChangeSearchRoom.bind(this);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.state = {
      rooms: [],
      currentRoom: null,
      userid2: "",
      searchRoom: "",
      status: "",
    };
  }

  componentDidMount() {
    this.retrieveRooms();
    const a = ["ds"];
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  }

  onChangeSearchRoom(e) {
    const searchRoom = e.target.value;

    this.setState({
      searchRoom,
    });
  }

  setActiveRoom(room, userid2) {
    const currentUser = AuthService.getCurrentUser();
    this.setState({
      currentRoom: room,
      userid2: currentUser.username,
    });
  }

  saveRoom() {
    const currentUser = AuthService.getCurrentUser();
    const { userid2 } = this.state;

    const data = {
      userid2: currentUser.id,
    };
    console.log(userid2);
    RoomDataService.create(data)
      .then((response) => {
        this.setState({
          rooms: response.data.room,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveRooms() {
    const currentUser = AuthService.getCurrentUser();
    const { rooms } = this.state;
    RoomDataService.findAllPublished(currentUser.accessToken)
      .then((response) => {
        this.setState({
          rooms: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRooms();
    this.setState({
      currentRoom: null,
    });
  }

  test() {
    const { searchRoom, rooms, userid2 } = this.state;
    console.log(rooms);
  }

  render() {
    const { searchRoom, rooms, userid2 } = this.state;
    return (
      <>
        <h4 className="d-flex justify-content-center">Stats</h4>
        <br />
        <div className="d-flex justify-content-center">
          <br />
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">id</th>
                <th scope="col">room</th>
                <th scope="col">PlayerRed</th>
                <th scope="col">PlayerBlue</th>
                <th scope="col">Status</th>
                <th scope="col">BlueNum</th>
                <th scope="col">RedNum</th>
                <th scope="col">win</th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms.map((room) => (
                  <tr>
                    <td>{room.id}</td>
                    <td>{room.room}</td>
                    <td>{room.userid1}</td>
                    <td>{room.userid2}</td>
                    <td>{room.status}</td>
                    <td>{room.rednum}</td>
                    <td>{room.bluenum}</td>
                    <td>{room.win}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
