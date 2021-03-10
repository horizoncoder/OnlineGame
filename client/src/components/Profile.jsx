import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import Game from "./Game";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser, userReady: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const { currentUser } = this.state;
    const { userReady } = this.state;
    return (
      <>
        <div className="container">
          {userReady ? (
            <div>
              <header className="jumbotron">
                <h3>
                  <strong>{currentUser.username}</strong>
                  Profile
                </h3>
              </header>
              <p>
                <strong>Id:</strong>

                {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong>

                {currentUser.email}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
              </ul>
            </div>
          ) : null}
        </div>
        <Game />
      </>
    );
  }
}
