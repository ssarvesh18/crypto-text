import io from 'socket.io-client';
import axios from 'axios';

let socket;
const join = (Groupdata)=> {
    socket = io();
    if(socket && Groupdata) socket.emit('join',Groupdata);
}
const leave = (Groupdata)=>{
    socket.emit('leave',Groupdata);
    if(socket) socket.disconnect();
}
const chat = (cb)=>{ 
    if (!socket) return(true);
    socket.on('chat',function(data){
    
    return cb(null, data);
})
    
}
const sendChat = (Groupdata,user,inputFields)=>{
    axios.post('/chatroom/groups/message',{Groupdata,user,inputFields},{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
              const messagedata = response.data.messagedata;
              socket.emit('chat',Groupdata,messagedata);
        }).catch((err)=>{
            
        });
    
}
export { 
    socket,
    join,
    leave,
    chat,
    sendChat
};