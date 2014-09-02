var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var people = {};
var rooms = {};

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
		io.emit('chat message', msg);
	})
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});