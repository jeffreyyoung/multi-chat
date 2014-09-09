
var $main = $('#main');

function hideAndRemoveContent(){
	$main.html('');
}
function injectHtmlToMain(html){
	$main.html(html);
}

socket.on('enter lobby', function(){
	hideAndRemoveContent();
	$.get('/lobby', function(data){
		injectHtmlToMain(data);
	})
});

socket.on('enter room', function(){
	hideAndRemoveContent();
	$.get('/room', function(data){
		injectHtmlToMain(data);
	})
})