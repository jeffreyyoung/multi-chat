var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var initSocket = require('./socket/main')(app, io)



var hbs = require('hbs');

app.set('view engine', 'html')
app.engine('html', hbs.__express);

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper( 'eachInMap', function ( map, block ) {
   var out = '';
   Object.keys( map ).map(function( prop ) {
      out += block.fn( {key: prop, value: map[ prop ]} );
   });
   return out;
} );


app.use('/public', express.static('public'));

http.listen(process.env.PORT || 1930, function(){
	var port = process.env.PORT || 1930;
	console.log('listening on *:' + port);
});

