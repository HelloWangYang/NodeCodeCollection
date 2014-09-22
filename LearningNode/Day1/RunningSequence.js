var http = require('http');
var fs = require('fs');

function writeNumbers(res) {
	var counter = 0;

	for (var i = 0; i < 100; ++i) {
		++counter;
		res.write(counter.toString() + '\n');
	}
}

http.createServer(function(req, res) {

	// url格式："http://localhost:8124/?file=abc"
	var query = require('url').parse(req.url).query;
	var app = require('querystring').parse(query).file + '.txt';
	
	res.write('Could not find or open file for reading\n');
	
	writeNumbers(res);
	setTimeout(function() {
		console.log('opening' + app);
		
		fs.readFile(app, 'utf-8', function(err, data) {
			if (err) {
				res.write('Could not find or open file for reading\n');
			} else {
				res.write(data);
			}
			res.end();
		});
	}, 2000);
}).listen(8124, function() { console.log('bond to port 8124'); });

console.log('Server running on port 8124/');
