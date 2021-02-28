import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
const [message,setMessage]= useState([])
const [users,setUsers]= useState([]);
const [roomId,setRoomId]=useState(null)

let socket;

export default function(){
    const {id,username} = useParams();
    useEffect(()=> {
        socket=io('http://localhost:5000');

        socket.emit('join-room',{
            roomId: id,
            username
        })
        const handler = data=>{
            setUsers(data.users);
            setRoomId(data.id);
        }
        socket.on('roomData',handler)
        return ()=>{
            socket.emit('leave-room', {
                roomId,
                user: username

            })
            socket.off('roomData',handler);
            socket.disconnect();
        }
    },[id])
    useEffect(()=>{
        const nandler = data =>{
            setMessage([...message, data.message]);
        }
        socket.on('message',handler);
        return()=>{
            socket.off('message',handler)
        }
    }, {message})
    const sendMessage = event =>{
        event.preventDefault();
        if(!message) return;
        socket.emit('message',{
            username,
            text: message,
            roomId
        })
        setMessage();
    }
    return(
        <div style={{display: 'flex'}}>
            <div>
                <h1>Users</h1>
                <div>
                    {users.map((user,index)=>(
                        <div key={index}>
                            {user}
                        </div>
                     ))}
                </div>
            </div>
            <div >
                        <div style={{height: '500px', overflowY:'auto'}}>
                            {message.map((message,index)=>(
                                <div>
                                    {message.username} says:
                                    <br></br>
                                    {message.text}

                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage}>
                        <input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message"></input>
                        </form>
                       
            </div>
        </div>
    )
}