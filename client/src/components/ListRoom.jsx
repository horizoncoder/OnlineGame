import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoomDataService from "../services/room.service";
import AuthService from "../services/auth.service";

export default class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchRoom = this.onChangeSearchTitle.bind(this);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.removeAllRooms = this.removeAllRooms.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.searchRoom = this.searchTitle.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.state = {
      rooms: [],
      currentRoom: null,
<<<<<<< HEAD
      userid2: "",
=======
      userid2:"" ,
>>>>>>> de0a04b72e41915e5429ad4a311859de942cf193
      searchRoom: "",
    };
  }

  componentDidMount() {
    this.retrieveRooms();
  }

  onChangeSearchTitle(e) {
    const searchRoom = e.target.value;

    this.setState({
      searchRoom,
    });
  }

  setActiveRoom(room) {
    const currentUser = AuthService.getCurrentUser();
    this.setState({
      currentRoom: room,
<<<<<<< HEAD
      userid2: currentUser.id,
=======
      userid2:currentUser.id
>>>>>>> de0a04b72e41915e5429ad4a311859de942cf193
    });
    
  }

  saveRoom() {
    const currentUser = AuthService.getCurrentUser();
    const { room,userid1,userid2 } = this.state;
    
    const data = {
       userid2:currentUser.id ,

    };
console.log(userid2);
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
  updateTutorial() {
    const currentUser = AuthService.getCurrentUser();
    const data = {
      userid2:currentUser.id ,

   };
   RoomDataService.update(data)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveRoom() {
    const currentUser = AuthService.getCurrentUser();
    const { room, userid1, userid2 } = this.state;

    const data = {
      userid2: currentUser.id,
    };
    console.log(userid2);
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

  updateTutorial() {
    const currentUser = AuthService.getCurrentUser();
    const data = {
      userid2: currentUser.id,
    };
    RoomDataService.update(data)
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

  searchTitle() {
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
    const { searchTitle, rooms, userid2 } = this.state;
    const currentUser = AuthService.getCurrentUser();
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Room List</h4>

          <ul className="list-group">
            {rooms &&
              rooms.map((room, index) => (
                <li
                  className="list-group-item "
                  onMouseEnter={() => this.setActiveRoom(room, index)}
                  key={index}
                >
                  {room.room}
                  <Link to={`/chat?name=${userid2}&room=${room.room}`}>
                    <button
                      onClick={() => this.deleteRoom()}
                      className="d-inline-flex m-2 bg-success text-light"
                      type="submit"
                      onClick={this.updateTutorial}
                    >
                      connect
                    </button>
                  </Link>
                  <button
                    className="d-inline-flex m-2 bg-danger text-light"
                    onClick={() => this.deleteRoom()}
                    type="submit"
                  >
                    Delete
                  </button>
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
    );
  }
}
