import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomsInfo from './RoomsInfo';
import './App.css';
import TutorialDataService from '../services/tutorial.service';
import AuthService from '../services/auth.service';
import TutorialsList from './tutorial.component'

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.state = {
      room: "",
    };
  }

  onChangeRoom(e) {
    this.setState({
      room: e.target.value,
    });
  }

  render() {
    const currentUser = AuthService.getCurrentUser();
    const { room } = this.state;
    return (
      <>
        <RoomsInfo />
        <div className="joinOutContainer">
          <div className="joinInContainer">
            <h1 className="heading">
              Join
              {currentUser.id}
            </h1>
            <div>
              <input
                type="text"
                placeholder="Room..."
                className="joinInput mt-20"
                onChange={this.onChangeRoom}
              />
            </div>
            <Link
              // onClick={(event) => (room ? event.preventDefault() : null)}
              to={`/chat?name=${currentUser.id}&room=${room}`}
            >
              <button type="submit" className="button mt-20">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
