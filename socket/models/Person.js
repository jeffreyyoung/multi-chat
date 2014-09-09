function Person(socket, username, room){
	this.socket = socket;
	this.currentRoom = 'lobby';
	this.username = username;
	this.currentRoom = room;
	socket.join('lobby');
}

Person.prototype.joinRoom = function(room){
	//this.currentRoom.leave(socket.id)
	//this.currentRoom = 
	socket.join(room);
}

module.exports = Person;