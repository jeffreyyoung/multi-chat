var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var initSocket = require('./socket/main')(app, io)

var hbs = require('hbs');

app.set('view engine', 'html')
app.engine('html', hbs.__express);

app.use('/public', express.static('public'));

http.listen(3000, function(){
	console.log('listening on *:3000');
});