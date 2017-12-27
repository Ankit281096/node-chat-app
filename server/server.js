const http=require('http');
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');

const {isRealString}=require('./utils/validation');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const publicPath=path.join(__dirname ,'../public');
const {Users}=require('./utils/users');
const {Rooms}=require('./utils/rooms');
var users = new Users();
var rooms = new Rooms();

const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io =socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New User Connected');
  socket.emit('updateRoomList',rooms.getRoomList());

    socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required');
    }

    if (!users.isUniqueUser(params.room,params.name)){
      return callback('A user with the same name exists in the room');
    }

    rooms.addRoom(params.room);
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage',(message,callback)=>{
    var user=users.getUser(socket.id);

    if (user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    var user=users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });
  socket.on('disconnect',()=>{
    var user =users.removeUser(socket.id);

    if (user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
      rooms.removeRoom(user.room,users.getUserList(user.room).length);
    }
  });
});


server.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
