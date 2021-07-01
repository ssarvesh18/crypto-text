
const mongoose = require('mongoose');
const {chatroom,user,message}  = require('./schemas');
const fetchGroups = async (req,res)=>{

    const groups = await chatroom.find({users : req.user.username, is_group:true });
    res.json({
        message : "Groups",
        groups
    }); 
}
const fetchChats = async (req,res)=>{
    
    const chats = await chatroom.find({users : req.user.username, is_group:false });
    res.json({
        message : "conversations",
        chats
    });
}

const fetchUsers = async (req,res)=>{
    
    
    const users = await user.find({ username:{ $regex: `${req.query.usernames}`, $options: "i" }});
    const result = users.slice(0,10).map((data)=>data.username);
    res.json({
        result
    });
}
const fetchMail = async (req,res)=>{
    
    const users = await user.find({email :{ $regex: req.params.email , $options: "i" }});
    const result = users.slice(0, 10).map((data)=>data.mail);
    res.json({
        result
    });
}
const fetchGroupdetails = async (req,res)=>{
    const details = await chatroom.findOne({_id:req.params.Id});
    console.log(details);
    res.json({
        details
    })
}
const fetchMessages= async (req,res)=>{
    const messages = await message.find({chatroom: req.params.Id})
    res.json({
        messages
    })
}
module.exports = {
    fetchChats,
    fetchGroups,
    fetchUsers,
    fetchGroupdetails,
    fetchMail,fetchMessages
}