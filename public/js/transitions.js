
var $main = $('#main');

function attachListenerToMessenger(){
	$(".messenger button").on('click',function(){
		var message = $('.messenger input').val();
		$('.messenger input').val('');
		socket.emit('message', message);
	})
}

function attachRoomListeners(){
	$("#rooms a").on('click', function(){
		socket.emit('enter room', $(this).text())
	})

	$('#back-to-lobby').on('click', function(){
		socket.emit('enter lobby');
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

socket.on('enter lobby', function(){
	transition('/lobby')
});

socket.on('enter room', function(roomId){
	transition('/room/' + roomId)
})