import React, { Fragment, useState } from "react";


const InputTodo = ({ setTodosChange }) => {
  const [win, setWin] = useState("");
  const [score, setScore] = useState("");
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { win ,score};
      const response = await fetch("http://localhost:5000/dashboard/stats", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setWin("");
      setScore("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={win}
          onChange={e => setWin(e.target.value)}
        />
          <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={score}
          onChange={e => setScore(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
        
      </form>
     
    </Fragment>
  );
};

export default InputTodo;