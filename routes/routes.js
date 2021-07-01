
const express = require('express');
const router = express.Router();
const userController = require('./userController');
const chatroomController = require('./chatroomController');
const fetchController = require('./fetchController');
const {catchErrors} = require('./errorhandlers');
const { authorize, authorize2 } = require('./authorization');

router.post('/login',catchErrors(userController.login));
router.post('/register',catchErrors(userController.register));

router.get('/dashboard/groups',authorize,catchErrors(fetchController.fetchGroups));
router.get('/dashboard/chats',authorize,catchErrors(fetchController.fetchChats));
router.get('/search/users',authorize,catchErrors(fetchController.fetchUsers));
router.get('/search/email',authorize,catchErrors(fetchController.fetchMail));
router.get('/dashboard/groups/details/:Id',authorize,catchErrors(fetchController.fetchGroupdetails));
router.get('/dashboard/group/messages/:Id',authorize,catchErrors(fetchController.fetchMessages));
router.get('/dashboard/message/authorize',authorize2);

router.post('/chatroom/create',authorize,catchErrors(chatroomController.createChatroom));
router.post('/chatroom/groups/add',authorize,catchErrors(chatroomController.addtoChatroom));
router.post('/chatroom/groups/remove',authorize,catchErrors(chatroomController.removeFromChatroom));
router.post('/chatroom/groups/makeadmin',authorize,catchErrors(chatroomController.makeAdmin));
router.post('/chatroom/groups/removeadmin',authorize,catchErrors(chatroomController.removeAdmin));
router.post('/chatroom/groups/message',authorize,catchErrors(chatroomController.sendMessage));
router.post('/chatroom/groups/deletemessage',authorize,catchErrors(chatroomController.deleteMessage));

module.exports = router;