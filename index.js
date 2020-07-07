const server = require('./app')
const port = process.env.PORT;

server.listen(port, err => {
	if(err){
		console.log(err);
	}
	console.log('server running on port ' + port);
})