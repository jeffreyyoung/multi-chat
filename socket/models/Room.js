function Room(name){
	this.name = name;
	this.id = hash(name);
	this.people = {};

}

function hash(str){//http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-r
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

Room.prototype.addPerson = function(person){
	this.people[person.id] = person;
}

Room.prototype.removePerson = function(person){
	delete this.people[person.id];
}

module.exports = Room;