var socket = io();

socket.on('connect',function (){
  console.log('Connected to server');
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function (message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var li=jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function (message) {
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var li=$('<li></li>');
  var a =$('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} ${formattedTime}:`);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
var messageBox=$('[name=message]')
  socket.emit('createMessage',{
    from:'User',
    text:messageBox.val()
  },function (){
      messageBox.val('');
  });
});

var locationButton=$('#send-location');
locationButton.on('click',function(){
  if (!navigator.geolocation){
    return console.log('Geolocation not supported by your Browser');
  }
locationButton.attr('disabled','disabled').text('Sending location');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function (){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch Location');
  });
});
