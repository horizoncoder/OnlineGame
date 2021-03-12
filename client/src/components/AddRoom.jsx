import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TutorialDataService from '../services/room.service';
import AuthService from '../services/auth.service';

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      room: '',
    };
  }

  onChangeTitle(e) {
    this.setState({
      room: e.target.value,
    });
  }

  saveTutorial() {
    const data = {
      room: this.state.room,
    };

    TutorialDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          room: response.data.room,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      room: '',
    });
  }

  render() {
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
              value={this.state.room}
              onChange={this.onChangeTitle}
              name="room"
            />
          </div>
          <Link to={`/chat?name=${currentUser.id}&room=${this.state.room}`}>
            <button
              onClick={this.saveTutorial}
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
