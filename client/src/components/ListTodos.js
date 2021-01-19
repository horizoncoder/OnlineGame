import React, { Fragment, useState, useEffect } from "react";


const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [states, setStates] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/states/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      setStates(states.filter(state => state.state_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  useEffect(() => {
    setStates(allTodos);
  }, [allTodos]);

  console.log(states);

  return (
    <Fragment>
      {" "}
   <h1>FFF</h1>
    </Fragment>
  );
};

export default ListTodos;