import React, { Fragment, useState,useEffect } from 'react';
import {Button, Navbar} from 'react-bootstrap'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navibar from './components/Navibar';

import Login from './components/Login';

import {Game} from './components/Game';


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

toast.configure()


function App() {
  const [isAuthenticated,setIsAuthentication] = useState(false);
  const setAuth=(boolean)=>{
    setIsAuthentication(boolean)
  };
  async function isAuth(){
    try {

      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });


      const parseRes= await res.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthentication(true): setIsAuthentication(false);
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(()=>{
    isAuth()
  })
  
  return (
    <Fragment>

      <Router>
      <Navibar/>
        <div className="container">
          <Switch>
           
            <Route exact path="/login"  render={props => !isAuthenticated ? (  <Login {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" />  ) } />

            <Route exact path="/register" render={props =>  !isAuthenticated ? (   <Register {...props} setAuth={setAuth} />   ) : (   <Redirect to="/dashboard" />  ) }  />

            <Route   exact  path="/dashboard"render={props =>    isAuthenticated ? (   <Dashboard {...props} setAuth={setAuth} /> ) : (   <Redirect to="/login" />   )      }   />
            
            <Route  exact path="/" component={Home}/>
            <Route  exact path="/game" component={Game}/>
           
            
            <Route   exact  path="/game"render={props =>    isAuthenticated ? (   <Dashboard {...props} setAuth={setAuth} /> ) : (   <Redirect to="/login" />   )      }   />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
