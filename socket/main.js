var Room = require("./models/Room")
var Person = require("./models/Person")


module.exports = function init(app, io){

	var people = {};
	var rooms = {};
	rooms['lobby'] = new Room('lobby', people);

	io.on('connection', function(socket) {

		console.log('a user connected');

		socket.on('disconnect', function() {
			if(people[socket.id]){
				var person = people[socket.id];
				console.log(person.name + " is leaving");
				socket.broadcast.to(person.currentRoom).emit('person left room', person.socket.id, person.name);
				rooms[people[socket.id].currentRoom].removePerson(socket.id);
				delete people[socket.id];
			}
			console.log('user disconnected');
		});

		socket.on('set username', function(name){
			var person = new Person(socket, name, rooms);
			people[socket.id] = person;
			rooms['lobby'].addPerson(socket.id);
			socket.emit('enter room', 'lobby');
			socket.to('lobby').emit('person entered room', person.socket.id, person.name);
		})

		socket.on('enter room', function(roomID){
			switchRooms(socket, roomID);
		})

		socket.on('message', function(message){
			//console.log(people[socket.id].name +": " + message + " => to " + people[socket.id].currentRoom)
			io.sockets.in(people[socket.id].currentRoom).emit('message', people[socket.id].name, message);
			var person = people[socket.id];
		})

		socket.on('create room', function(name){
			var person = people[socket.id]
			var room = new Room(name, people);
			if(!rooms[room.id]) {
				socket.broadcast.to('lobby').emit('room created', room.id, room.name);
				rooms[room.id] = room;
				switchRooms(person.socket, room.id);

			}	

		})
	});

	function switchRooms(socket, id){
		var person = people[socket.id];

		//notify current room that you are leaving
		socket.broadcast.to(person.currentRoom).emit('person left room', person.socket.id, person.name);

		//enter room
		person.joinRoom(id);
		socket.emit('enter room', id);

		//notify current room that you have entered
		socket.broadcast.to(person.currentRoom).emit('person entered room', person.socket.id, person.name);
	}

	app.get('/', function(req, res) {
		res.render('index',{people: people});
	});

	app.get('room/lobby', function(req, res){
		res.render('lobby', {
			people: rooms['lobby'].people,
			rooms: rooms
		})
	});

	app.get('/room/:id', function(req, res){
		if (req.params.id == 'lobby') {
			res.render('lobby', {
				people: rooms['lobby'].people,
				rooms: rooms
			})
		} 
		else {
			res.render('room', rooms[req.params.id])
		}
	})
}