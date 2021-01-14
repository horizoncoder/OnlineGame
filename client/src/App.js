import React, { Fragment, useState } from 'react';
import {Button, Navbar} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navibar from './components/Navibar';

import Login from './components/Login';

import Dashboard from './components/Dashboard';


import Register from './components/Register';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {Home} from './router/Home';

//import {Login} from './router/Login';
//<Route path="/login" component={Login}/>


function App() {
  const [isAuthentication,setIsAuthentication] = useState(false);
  const setAuth=(boolean)=>{
    setIsAuthentication(boolean)
  };
  return (
  <Fragment>
  <Router>
  <Navibar></Navibar>
  <Switch>
   
    <div className="container">


    <Route exact path="/login" render={props =>!isAuthentication ? (<Login {...props} setAuth={setAuth} />   ) : (  <Redirect to="/dashboard" /> )  } />
    <Route exact path="/register" render={props =>!isAuthentication ? (<Register {...props} setAuth={setAuth} />   ) : (  <Redirect to="/login" /> )  } />
    <Route exact path="/dashboard" render={props =>!isAuthentication ? (<Dashboard {...props} setAuth={setAuth} />   ) : (  <Redirect to="/login" /> )  } />
  
    </div>
  </Switch>
  
  </Router>
  </Fragment>
  
  );
}

export default App;
