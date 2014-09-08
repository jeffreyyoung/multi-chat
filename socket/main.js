module.exports = function init(app, io){

	var people = {};
	var rooms = {};

	io.on('connection', function(socket) {

		console.log('a user connected');
		people[socket.id] = socket.id;

		socket.on('disconnect', function() {
			delete people[socket.id];
			console.log('user disconnected');
		});

		

	});



	app.get('/', function(req, res) {
		console.log(__dirname);
		res.render('index',{people: people});
	});

}