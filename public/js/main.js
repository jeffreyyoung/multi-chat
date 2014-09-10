var socket = io();

$('form#login').submit(function(){
	socket.emit('set username', $('#username').val());
	$('#user-name').val('');
	return false;
});


socket.on('room created', function(id, name){
	$('<li>').text('<a>' + name + '</a')
		.attr('id', id)
		.on('click', function(){
			socket.emit('enter room', id)
		})
})

socket.on('enter room', function(roomId){
	transition('/room/' + roomId)
})

socket.on('message', function(name, message){
	$('#messages').append($('<li>').text(name + ": " + message));
})

socket.on('person entered room', function(id, name){
	console.log(name + "entered room")
	$('#people').append($('<li>').text(name).attr('id', id))
	$('#messages').append($('<li>').text(name + " entered the room"));
})

socket.on('person left room', function(id, name){
	console.log(name + " left")
	$('#people #'+id).remove();
	$('#messages').append($('<li>').text(name + "left the room"));
})




// socket.on('console', function(data){
// 	console.log(data);
// })