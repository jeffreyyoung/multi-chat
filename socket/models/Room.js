function Room(name, allPeople){
	this.name = name;
	this.id = hash(name);
	this.people = {};
    this.allPeople = allPeople;

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

Room.prototype.addPerson = function(personID){
    var newPerson = this.allPeople[personID]
	this.people[personID] = newPerson;
}

Room.prototype.removePerson = function(personID){
	delete this.people[personID];
}

Room.prototype.getPeopleCount = function() {
    return  Object.keys(this.people).length
}

module.exports = Room;