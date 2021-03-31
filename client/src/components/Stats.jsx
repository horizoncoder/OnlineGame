import React, { Component } from "react";
import { Table } from "react-bootstrap";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";

export default class RoomsList extends Component {
  constructor(props) {
    super(props);

    this.retrieveRooms = this.retrieveRooms.bind(this);

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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  }

  retrieveRooms() {
    const currentUser = AuthService.getCurrentUser();
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

  render() {
    const { rooms } = this.state;
    return (
      <>
        <h4 className="d-flex justify-content-center">Stats</h4>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>room</th>
              <th>PlayerRed</th>
              <th>PlayerBlue</th>
              <th>Status</th>
              <th>BlueNum</th>
              <th>RedNum</th>
              <th>win</th>
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
                  <td>{room.bluenum}</td>
                  <td>{room.rednum}</td>
                  <td>{room.win}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    );
  }
}
