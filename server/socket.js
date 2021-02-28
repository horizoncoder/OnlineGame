let rooms=[];
module.exports=()=>{
const getRoomData=roomId=>{
    const index = rooms.findIndex(_room=>_room.id===roomId);
    if(index=== -1){
        rooms.push( {
                id: roomId,
                users: []
            }
        )
        return rooms[0];
    }else{
        return rooms[index];
    }
}

const getRoomIndex = roomId => {
    return  rooms.findIndex(_room=>_room.id===roomId);
}

const addUserToRoom=(username,roomId)=>{
    const index = getRoomData(roomId);
    rooms[index].users.push(username);
    return rooms[index];

}
const removeUserFromRoom = (username,roomId)=>{
    const index = getRoomIndex(roomId);
    for(let i = 0; i<rooms[index].users.lenght; i++){
        if(rooms[index].users[i]===username){
            rooms[index].users.splice(i,1);
        }
    }
    return rooms[index];
}
return {
    getRoomData,
    addUserToRoom,
    removeUserFromRoom
}
}