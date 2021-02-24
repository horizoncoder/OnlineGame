import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketClient from "socket.io-client";
import Navibar from "./components/Navibar";

import Login from "./components/Login";
import { ProtectedRoute, LoginRoute } from "./components/ProtectedRoute";

import Game from "./components/Game";

import Stats from "./components/Stats";

import Dashboard from "./components/Dashboard";
import { Home } from "./router/Home";
import Register from "./components/Register";
import { API_URL } from "./components/api";

const SERVER = "http://localhost:5000";

toast.configure();

function App() {
  const socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
});
  const [isAuthenticated, setIsAuthentication] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthentication(boolean);
  };
  async function isAuth() {
    try {
      const res = await fetch(`${API_URL}auth/is-verify`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      if (parseRes === true) {
        setIsAuthentication(true);
      } else {
        setIsAuthentication(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isAuth();
  });
  return (
    <>
      <Router>
        <Navibar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => (
                <LoginRoute
                  {...{ props }}
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                  component={Login}
                />
              )}
            />

            <Route
              exact
              path="/register"
              render={(props) => (
                <LoginRoute
                  {...{ props }}
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                  component={Register}
                />
              )}
            />

            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <ProtectedRoute
                  {...{ props }}
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                  component={Dashboard}
                />
              )}
            />

            <Route exact path="/" component={Home} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/stats" component={Stats} />
            <Route
              exact
              path="/game1"
              render={(props) => (
                <ProtectedRoute
                  {...{ props }}
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                  component={Game}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
