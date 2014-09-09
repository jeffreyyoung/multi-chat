var socket = io();

$('form#login').submit(function(){
	socket.emit('set username', $('#username').val());
	$('#user-name').val('');
	return false;
});

socket.on('message', function(name, message){
	$('#messages').append($('<li>').text(name + ": " + message));
})





// socket.on('console', function(data){
// 	console.log(data);
// })