import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_URL } from "./api";
import Game from "./Game";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch(`${API_URL}dashboard`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
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
      <h2>
        Добро пожаловать,
        {name}
      </h2>
      <button
        type="submit"
        onClick={(e) => logout(e)}
        className="btn btn-primary"
      >
        Logout
      </button>
      <Game />
    </div>
  );
};

Dashboard.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Dashboard;
