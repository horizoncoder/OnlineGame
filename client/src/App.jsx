import React from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketClient from "socket.io-client";
import Navibar from "./components/Navibar";

import Game from "./components/Game";

import Stats from "./components/Stats";
import { Home } from "./router/Home";
import Logins from "./components/LoginS";
import RegisterS from "./components/RegisterS";
import ChooseRoom from "./components/ChooseRoom";
import Room from "./components/Room";
import Chat from "./components/Chat";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import Profile from "./components/Profile";
import TutorialsList from "./components/ListRoom";
import AddTutorial from "./components/AddRoom";

const SERVER = "http://localhost:5000";

toast.configure();

function App() {
  const socket = socketClient(SERVER);
  socket.on("connection", () => {});

  return (
    <>
      <Router>
        <Navibar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/chooseroom" component={ChooseRoom} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/registers" component={RegisterS} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Logins} />
            <Route exact path="/register" component={RegisterS} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/stats" component={Stats} />
            <Route exact path="/rooms" component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Router path="/" exact>
              <ChooseRoom />
            </Router>
            <Router path="/room/:id/:username">
              <Room />
            </Router>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
