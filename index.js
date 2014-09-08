var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.people = {};
app.rooms = {};

var people = app.people;
var rooms = app.rooms;

app.get('/', function(req, res) {
	console.log(__dirname);
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('set user-name', function(name) {
		people[socket.id] = name;
		io.emit('chat message', name + " has joined the server")
	})

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', people[socket.id], msg);
	})
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});