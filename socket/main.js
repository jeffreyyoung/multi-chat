var Room = require("./models/Room")
var Person = require("./models/Person")


module.exports = function init(app, io){

	var people = {};
	var rooms = {};
	rooms['lobby'] = new Room('lobby', people);
	rooms['room1'] = new Room('room1', people);
	rooms['room2'] = new Room('room2', people);


	io.on('connection', function(socket) {

		console.log('a user connected');

		socket.on('disconnect', function() {
			delete people[socket.id];
			//leave room
			console.log('user disconnected');
		});

		socket.on('set username', function(name){
			console.log('setting username: ' + name)
			people[socket.id] = new Person(socket, name, rooms);
			socket.emit('enter lobby');
			socket.broadcast.to('lobby').emit('user entered', name);
		})

		socket.on('enter lobby', function() {
			var person = people[socket.id];
			console.log(person.currentRoom + ": entering lobby")
			socket.broadcast.to(person.currentRoom).emit('person left room', person.socket.id, person.name)
			person.joinRoom('lobby');
			socket.emit('enter lobby');
			socket.broadcast.to(people[socket.id].currentRoom).emit('person entered room', person.socket.id, person.name)
		})

		socket.on('message', function(message){
			//console.log(people[socket.id].name +": " + message + " => to " + people[socket.id].currentRoom)
			io.sockets.in(people[socket.id].currentRoom).emit('message', people[socket.id].name, message);
		})

		socket.on('enter room', function(room){
			console.log(people[socket.id].name + " wants to enter " + room)
			var person = people[socket.id];
			console.log(person.currentRoom)
			person.joinRoom(room);
			console.log(person.currentRoom)
			socket.emit('enter room', room);
			socket.broadcast.to(person.currentRoom).emit('person entered room', person.socket.id, person.name)

			// socket.emit('console', {
			// 	thing: person
			// })//
		})
	});



	app.get('/', function(req, res) {
		res.render('index',{people: people});
	});

	app.get('/lobby', function(req, res){
		res.render('lobby', {
			people: people,
			rooms: rooms
		})
	});

	app.get('/room/:name', function(req, res){
		res.render('room', rooms[req.params.name])
	})
}