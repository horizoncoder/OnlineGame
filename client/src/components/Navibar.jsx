import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, Form } from "react-bootstrap";
import AuthService from "../services/auth.service";

class Navibar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">
              JS Game
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {currentUser && (
                <li className="nav-item">
                  <Link to="/rooms" className="nav-link">
                    Rooms
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to="/stats" className="nav-link">
                    Stats
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to="/addroom" className="nav-link">
                    AddRooms
                  </Link>
                </li>
              )}
              {currentUser ? (
                <div className="navbar-nav ">
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/home" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/registers" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </Nav>
            <Form inline />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navibar;
