var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
var url = require('url');

mongoose.connect('mongodb://localhost/server');

var models = require('./models.js');
var pages = require('./pages.js');

var app = express();
app.use('/client', express.static('../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
	secret: '9738b7e231db7666afce75050fa2f310',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60 * 60 * 1000/*, secure: true*/ }
}));

app.use(function (req, res, next) {	
	var pageName = url.parse(req.url).pathname.substring(1);
	if (pages[pageName]) {
	    var inputData = {};
	    if (req.method == 'POST') {
	        for (var key in req.body) {
	            inputData[key] = req.body[key];
	        }
	    }

	    for (var key in req.query) {
	        inputData[key] = req.query[key];
	    }

	    pages[pageName].run(inputData, req.session, function (code, obj) {
			res.writeHead(code, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(obj))
	        res.end();
	    });
	}
	else
	{
		res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
		res.end(JSON.stringify({ error: "Not found", pageName: pageName}));
	}	
});

app.listen(8080);

