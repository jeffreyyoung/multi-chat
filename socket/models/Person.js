function Person(socket, username, rooms){
	this.socket = socket;
	this.currentRoom = 'lobby';
	this.name = username;
	this.rooms = rooms;

	this.socket.join(this.currentRoom)
	this.rooms[this.currentRoom].addPerson(this.socket.id);
}

Person.prototype.joinRoom = function(room){
	this.socket.leave(this.currentRoom);
	this.rooms[this.currentRoom].removePerson(this.socket.id);

	console.log(this.rooms);

	var room1 = this.rooms[this.currentRoom]

	console.log(room1.name + " has " + Object.keys(room1.people).length + " people")

	this.socket.join(room);
	this.rooms[room].addPerson(this.socket.id);

	this.currentRoom = room;
}

Person.prototype.sendMessage = function(message){
	io.sockets.in(this.currentRoom).emit('message', message);
}

module.exports = Person;

