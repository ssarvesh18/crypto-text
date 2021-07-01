const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : 'Name is required!'
    },
    username: {
        type:String,
        required:'User name is required!',
        unique:'User name already taken.'
    },
    email : {
        type : String,
        required : 'Mail Id is required!',
        unique : 'Mail Id already registered!',
    },
    password : {
        type : String,
        required : 'Password is required!'
    },
    is_active: {
        type: Boolean,
        default: true 
    },
},
{ timestamps: true }
)
const chatroomSchema = new mongoose.Schema({
    group_name: {
        type:String,
        required:'Chat room name is required!'
    },
    users: [String],
    admins : [String],
    is_group : {
        type : Boolean,
        default : true
    }
})

const messageSchema = new mongoose.Schema({
   chatroom: {
       type: mongoose.Schema.Types.ObjectId,
       required:'Chatroom is required!',
       ref:'Chatroom'
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    required:'user is required!',
    ref:'User'
    },
    username :{
        type:String,
        required: 'username cannot be empty'
    },
    message_body : {
        type:String,
        required: 'Message cannot be empty'
    },
    message_key : {
        type:String,
    },
    sent_at : {
        type: Date,
        default: Date.now
    }
})
userSchema.plugin(beautifyUnique);
chatroomSchema.plugin(beautifyUnique);
messageSchema.plugin(beautifyUnique);

const user = mongoose.model('User',userSchema);
const chatroom = mongoose.model('Chatroom',chatroomSchema);
const message = mongoose.model('Message',messageSchema);



module.exports = {
    user,
    chatroom,
    message
};