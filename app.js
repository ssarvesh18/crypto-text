const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const socket = require('socket.io');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('dotenv').config();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
}).then(()=>{
    console.log('database connection successful');
    }).catch(err =>{
        (err)=>console.log(err);
    });
require('./routes/schemas');
app.use(require('./routes/routes'));

const port = process.env.PORT||5000;

if(process.env.NODE_ENV==='production' ||  process.env.NODE_ENV == 'staging'){
    app.use(express.static("project/build"));
    const path = require("path");
    app.get("*", (req, res) => { 
        res.sendFile(path.resolve(__dirname,'project','build','index.html'));
    })
}
const server = app.listen(port,function(err){
    console.log(`running on port : ${port}`);
});

const io = socket(server,{cors:"*"});

io.on('connection',function(socket){
    console.log('socket connection made');
   
    socket.on('join', (Groupdata) => {
        socket.join(Groupdata._id);
     });

     socket.on('chat',(Groupdata,messagedata) => {
       
        io.to(Groupdata._id).emit('chat',messagedata);
   
     });
     socket.on('typing',(Groupdata,user)=>{
        const {username} = user;
        io.to(Groupdata._id).emit('typing',username);
     })
     socket.on("leave", (Groupdata) => {
        console.log('left chat');
        socket.leave(Groupdata._id);
       
    })
   
})
