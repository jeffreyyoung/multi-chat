var socket = io();

socket.on('room created', function(id, name){
	console.log('room created')
	var li = $('<li>').text('<a>' + name + '</a>')
		.attr('id', id)
		.on('click', function(){
			socket.emit('enter room', id)
		})

	$("#rooms").append(li);

})

socket.on('room destroyed', function(id){
	$('#' + id).fadeOut(300, function(){
		$(this).remove();
	})
})

socket.on('enter room', function(roomId){
	transition('/room/' + roomId)
})

socket.on('message', function(name, message){
	$('#messages').append($('<li>').text(name + ": " + message));
})

socket.on('person entered room', function(id, name){
	console.log(name + "entered room")
	$('#people').append($('<li>').text(name).attr('id', id).hide().fadeIn())
	$('#messages').append($('<li>').text(name + " entered the room").hide().fadeIn());
})

socket.on('person left room', function(id, name){
	console.log(name + " left")
	$('#people #'+id).fadeOut(300, function(){$(this).remove()});
	$('#messages').append($('<li>').text(name + " left the room").hide().fadeIn());
})




// socket.on('console', function(data){
// 	console.log(data);
// })