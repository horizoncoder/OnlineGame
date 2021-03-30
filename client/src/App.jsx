import React from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketClient from "socket.io-client";
import Navibar from "./components/Navibar";

import Stats from "./components/Stats";
import { Home } from "./router/Home";
import Logins from "./components/LoginS";
import RegisterS from "./components/RegisterS";
import Chat2 from "./components/Chat2";
import Profile from "./components/Profile";
import TutorialsList from "./components/ListRoom";

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
            <Route exact path="/chat2" component={Chat2} />
            <Route exact path="/registers" component={RegisterS} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Logins} />
            <Route exact path="/stats" component={Stats} />
            <Route exact path="/rooms" component={TutorialsList} />
            <Router path="/" exact />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
