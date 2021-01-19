import React, { useEffect, useState ,Fragment} from "react";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
import {API_URL} from  './api';
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [win, setWin] = useState("");
  const [score, setScore] = useState("");
  const getProfile = async () => {
    try {
      console.log(API_URL+"dashboard")
      const res = await fetch(
        API_URL+"dashboard", {
        method: "GET",
        headers: { token: localStorage.token }
      });

  

    const parseRes = await res.json();
    console.log(parseRes);
    setName(parseRes.user_name)
    setWin(parseRes.win)
    setScore(parseRes.score)
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Панель</h1>
      <h2>Добро пожаловать {name} ,у тебя {win} побед и {score}  очков</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>

      <Link to="/game">Play</Link>
      <InputTodo></InputTodo>
      <ListTodos></ListTodos>
    </div>
    
  );
};



export default Dashboard;
