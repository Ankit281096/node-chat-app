var socket = io();

function forEach(array, callback, scope) {
	for (let i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]);
    }
}

function scrollToBottom() {
  var messages=$('#messages');
  var newMessage=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect',function (){
  var params= $.deparam(window.location.search);
  params.room=params.room.toLowerCase();

  socket.emit('join',params,function (err) {
    if (err){
      alert(err);
      window.location.href='/';
    }else {
      console.log('No error');
    }
  });
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('updateUserList',function (users) {
  var ol=$('<ol></ol>');

  forEach(users,function (i,user){
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage',function (message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=$('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function (message) {
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=$('#location-message-template').html();
  var html=Mustache.render(template,{
    from:message.from,
    createdAt:formattedTime,
    url:message.url
  });
$('#messages').append(html);
scrollToBottom();
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
