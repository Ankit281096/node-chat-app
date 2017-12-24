const http=require('http');
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname ,'../public');

const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io =socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New User Connected');

  socket.on('createMessage',(message)=>{
    console.log('Create Message',message);
  });

  socket.on('disconnect',()=>{
    console.log('Client Disconnected');
  });

  socket.emit('newMessage',{
    from: 'Rajat',
    text:'Hey,what is going on',
    createdAt:123
  });
});


server.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
