module.exports = function init(app, io){

	var people = {};
	var rooms = {};

	io.on('connection', function(socket) {

		console.log('a user connected');

		socket.on('disconnect', function() {
			delete people[socket.id];
			//leave room
			console.log('user disconnected');
		});

		socket.on('set username', function(name){
			console.log('setting username: ' + name)
			people[socket.id] = name;
			socket.emit('enter lobby');
			//socket.broadcast.to('lobby').emit('user entered', name);
		})

	});



	app.get('/', function(req, res) {
		console.log(__dirname);
		res.render('index',{people: people});
	});

	app.get('/lobby', function(req, res){
		res.render('lobby', {
			people: people,
			rooms: rooms
		})
	});

}