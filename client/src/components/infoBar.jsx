import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RoomDataService from '../services/room.service';
import AuthService from '../services/auth.service';

export default class InfoBar extends Component {
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
      userid2: '',
      searchRoom: '',
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
      userid2: currentUser.id,
    });
  }

  saveRoom() {
    alert("sedwe")
    const currentUser = AuthService.getCurrentUser();
    const { room } = this.props;

    const data = {
      room,
      userid1: currentUser.id,
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

  updateTutorial() {
    const currentUser = AuthService.getCurrentUser();
    const data = {
      userid2: currentUser.id,
    };
    RoomDataService.update(data)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: 'The tutorial was updated successfully!',
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
    return (
      <>
        <div className="infoBar">
          <div className="leftInnerContainer">
            <h3>{this.props.room}</h3>
            <Link to="/rooms">
              <button onClick={() => this.saveRoom()} type="submit">
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
