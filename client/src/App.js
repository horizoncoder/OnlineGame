import React from 'react';
import {Button, Navbar} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navibar from './components/Navibar';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Home} from './router/Home';
import {Login} from './router/Login';

function App() {
  return (
  <>
  <Router>
  <Navibar/>
  <Switch>
    <Route  exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
  </Switch>
  </Router>
  </>
  );
}

export default App;
