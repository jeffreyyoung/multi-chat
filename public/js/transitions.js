
var $main = $('#main');

$('form#login').submit(function(){
	var name = $('#username').val();
	if (/\S/.test(name)){
		socket.emit('set username', name.trim());
	}
	$('#user-name').val('');
	return false;
});

function attachListenerToMessenger(){
	$('form#messenger').submit(function(){
		var message = $('#messenger input').val();
		$('#messenger input').val('');

		if (/\S/.test(message)) //check if string is not just whitespace
			socket.emit('message', message);

		return false;
	})
}

function attachRoomListeners(){

	$('#create-room').on('click', function(){

		var name = $("#room-name").val();

		if (/\S/.test(name)){
			socket.emit('create room', name.trim());
			$("#myModal").modal('hide');
		}
	})

	$("#rooms li").on('click', function(){
		socket.emit('enter room', $(this).attr('id'))	
	})

	$('#back-to-lobby').on('click', function(){
		socket.emit('enter room', 'lobby');
	})
}

function transition(url){
	$.get(url, function(data){
		$main.fadeOut(300, function(){
			$main.html(data);
			$main.fadeIn(300);

			attachListenerToMessenger();
			attachRoomListeners();
		})
	})
}

socket.on('enter room', function(roomId){
	transition('/room/' + roomId)
})