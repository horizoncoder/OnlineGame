import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
const [username, setUsername]=useState();

export default function(){
    const history =useHistory();
    const [room,setRoom]= useState('');
    const onSubmit=(event)=>{
        event.preventDefault();
        history.push(`/room/${room}/${username}`);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={room} onChange ={e=>setRoom(e.target.value)} placeholder="Room ID" ></input>
                <input value={username} onChange={e=>setUsername(e=> setUsername(e.target.value))} placeholder='Usernmae'></input>
                <button type='submit'>Join</button>
            </form>
        </div>
    )
}