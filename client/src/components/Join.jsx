import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoomsInfo from './RoomsInfo';
import InfoBar from "./infoBar";
import './App.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
 const arr=[]
  return (
    <>
      <RoomsInfo room={room} />
      <div className="joinOutContainer">
        <div className="joinInContainer">
          <h1 className="heading">Join</h1>
          <div>
            <input
              type="text"
              placeholder="Name..."
              className="joinInput"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Room..."
              className="joinInput mt-20"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/Chat?name=${name}&room=${room}`}
          >
            <button type="submit" className="button mt-20">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Join;
