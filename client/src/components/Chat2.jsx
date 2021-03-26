import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Game from './Game';
import { socket } from '../store';
import AuthService from "../services/auth.service";
import RoomDataService from "../services/room.service";
function Chat2() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');

  // After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit('join_room', room);
  };

  const sendMessage = async () => {};
  const saveRoom = () => {
    const currentUser = AuthService.getCurrentUser();
    const rooms = [];
    const data = {
      room,
      userid1: currentUser.username,
      status: "wait",
      roomid: 100,
    };
    RoomDataService.create(data)
      .then((response) => {
        rooms.push(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(rooms);
  }
  const add=()=>{
    connectToRoom(),saveRoom()
  }
  return (
    <>
      <div className="App">
        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Name..."
                onChange={(e) => {
                  setUserName(currentUser.username);
                }}
              />
              <input
                type="text"
                placeholder="Room..."
                ref="sldlds"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <button onClick={add}>Enter Chat</button>
          </div>
        ) : (
          <div className="chatContainer">
            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author == userName ? 'You' : 'Other'}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.message}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="messageInputs">
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
            <Game room={room} />
          </div>
        )}
      </div>
    </>
  );
}

export default Chat2;
