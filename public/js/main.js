var socket = io();

$('form#login').submit(function(){
	socket.emit('set username', $('#username').val());
	$('#user-name').val('');
	console.log('setting username');
	return false;
});
