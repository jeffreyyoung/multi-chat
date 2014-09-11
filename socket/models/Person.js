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

	var room1 = this.rooms[this.currentRoom]

	this.socket.join(room);
	this.rooms[room].addPerson(this.socket.id);

	this.currentRoom = room;
}

Person.prototype.sendMessage = function(message){
	io.sockets.in(this.currentRoom).emit('message', message);
}

module.exports = Person;

