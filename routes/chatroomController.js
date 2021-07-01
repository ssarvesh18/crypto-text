const mongoose = require('mongoose');
const {chatroom, user, message}  = require('./schemas');
const jwt = require('jsonwebtoken');

const createChatroom = async (req,res)=>{
    try{
        const group_name = req.body.name;
        const person = await user.findById(req.user._id);
        const conversation = new chatroom({
            group_name ,
            users : [person.username],
            admins : [person.username]
        })
        await conversation.save();
        res.json({
            message : `${group_name} chatroom created `
        })
    }catch(err)
    {
        res.json({
            message : err.message
        })
    }   
}
 
const addtoChatroom = async (req,res)=>{
    const group = await chatroom.updateOne({ _id: req.body.group_id},{ $addToSet: { users: req.body.username } });
    res.json({
        message: `${req.body.username} added to group`,
        group
    });
}
const makeAdmin = async (req,res)=>{
    const group = await chatroom.updateOne({ _id: req.body.group_id},{ $addToSet: { users:req.body.username , admins:req.body.username } });
    res.json({
        message: `${req.body.username} made admin.`,
        group
    });
}
const removeFromChatroom = async (req,res)=>{
    const group = await chatroom.updateOne({ _id: req.body.group_id},{ $pull: { users: req.body.username , admins:req.body.username } });
    res.json({
        message: `${req.body.username} removed from group.`,
    });
}
const removeAdmin = async (req,res)=>{
    const group = await chatroom.updateOne({ _id: req.body.group_id},{ $pull: { admins:req.body.username } });
    res.json({
        message: `${req.body.username} removed from admin.`,
        group
    });
}
const sendMessage = async (req,res)=>{
    try{
    const Message = new message({
        chatroom:  req.body.Groupdata,
        user: req.body.user,
        username : req.user.username,
        message_body : req.body.inputFields.message, 
        message_key : req.body.inputFields.key
    })
    await Message.save((err,data)=>{
        if(err)
            throw err;
        else
        {
            const messagedata = data;
            res.json({
                message : `message sent`,
                messagedata
            })
        }
    });    
    }catch(err)
    {
        res.json({
            message : err.message
        })
    }
}
const deleteMessage = async (req,res)=>{
    try{
        await message.deleteOne({ _id : req.body.msg_id  });
        res.json({
            message: `message deleted`
        }
            )
    }catch(err){
        res.json({
            message : err.message
        })
    }
}
module.exports = {
    createChatroom,
    addtoChatroom,
    removeFromChatroom,
    makeAdmin,
    removeAdmin,
    sendMessage,
    deleteMessage
}