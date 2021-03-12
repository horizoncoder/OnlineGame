/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TutorialDataService from "../services/room.service";
import AuthService from '../services/auth.service';

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      rooms: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle,
    });
  }

  setActiveTutorial(room, index) {
    this.setState({
      currentTutorial: room,
      currentIndex: index,
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
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
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
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
    const { searchTitle, rooms, currentTutorial, currentIndex } = this.state;
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
                  className={`list-group-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onKeyDown={() => this.setActiveTutorial(room, index)}
                  key={index}
                  role="presentation"
                >
                  {room.room}
                  <Link to={`/chat?name=${currentUser.id}&room=${room.room}`}>
                    <button
                      className="d-inline-flex m-2 bg-success text-light"
                      type="submit"
                    >
                      connect
                    </button>
                  </Link>
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
            type="submit"
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6"> </div>
      </div>
    );
  }
}
