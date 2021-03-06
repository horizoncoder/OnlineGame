import React, { Component } from "react";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";
import BluePlayerconnect from "./JoinRoom";

export default class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchRoom = this.onChangeSearchRoom.bind(this);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.removeAllRooms = this.removeAllRooms.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
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
  }

  onChangeSearchRoom(e) {
    const searchRoom = e.target.value;

    this.setState({
      searchRoom,
    });
  }

  setActiveRoom(room) {
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

  updateTutorial() {
    const { currentRoom } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const data = {
      userid2: currentUser.username,
      status: "started",
    };
    RoomDataService.update(currentRoom.id, data)
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

  retrieveRooms() {
    RoomDataService.getAll()
      .then((response) => {
        this.setState({
          rooms: response.data,
        });
        //console.log(response.data);
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

  removeAllRooms() {
    RoomDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchRoom() {
    const { searchRoom } = this.state;
    this.setState({
      currentRoom: null,
    });

    RoomDataService.findByTitle(searchRoom)
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

  deleteRoom() {
    const { currentRoom } = this.state;
    RoomDataService.delete(currentRoom.id)
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { rooms } = this.state;
    console.log(rooms)
    return (
      <>
        <div className="list row">
          <div className="col-md-6">
            <h4>Room List</h4>

            <ul className="list-group">
              {rooms &&
                rooms.map((room) => (
                  <li
                    key={room.id}
                    className="list-group-item "
                    onMouseEnter={() => this.setActiveRoom(room)}
                  >
                    {room.test}
                    <br/>

                    {room.userid1}
                    <BluePlayerconnect roomsi={room.room} roomid={room.id} />
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllRooms}
              type="submit"
            >
              Remove All
            </button>
          </div>
        </div>
      </>
    );
  }
}
