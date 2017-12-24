var socket = io();

socket.on('connect',function (){
  console.log('Connected to server');

  socket.emit('createMessage',{
    from:'Ankit',
    text:'Hey This is Ankit'
  });
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function (message){
  console.log('Got new Message',message);
});
