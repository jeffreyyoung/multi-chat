
var $main = $('#main');

function attachListenerToMessenger(){
	$(".messenger button").on('click',function(){
		var message = $('.messenger input').val();
		$('.messenger input').val('');
		socket.emit('message', message);
	})
}

function attachRoomListeners(){

	$('#create-room').on('click', function(){
		socket.emit('create room', $("#room-name").val());
		$("#myModal").modal('hide');
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