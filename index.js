require('./db/connection')
const server = require('./app')

server.listen(5000, err => {
	if(err){
		console.log(err);
	}
	console.log('server running on port ' + '5000');
})