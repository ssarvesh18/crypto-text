const mongoose = require('mongoose');
const {chatroom, user}  = require('./schemas');

const createChat = async (req,res)=>{
    try{
        const person = await user.findById(req.user._id);
        const conversationExists = await chatroom.findOne({users:[person.username , req.username],is_group:false});
        if(!conversationExists)
        {    const conversation = new chatroom({
                group_name ,
                users : [person.username,req.username],
                is_group : false
            })
            await conversation.save();
        }
        res.json({
            message : `start converstion with ${req.username} `
        })
    }catch(err)
    {
        res.json({
            message : err.message
        })
    }   
}


module.exports = {
    createChat
}