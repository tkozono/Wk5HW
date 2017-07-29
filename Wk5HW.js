var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6565);

app.get('/',function(req,res){
	var context = {};
	context.reqType = "GET"
	if (Object.keys(req.query).length > 0){
		context.dataList = [];
		for (var p in req.query){
			context.dataList.push({'name':p,'value':req.query[p]})
		}
	}
	res.render('home', context);
});

app.post('/', function(req,res){
	var context = {};
	context.reqType = "POST"
	if (Object.keys(req.body).length > 0){
		context.dataList = [];
		for (var p in req.body){
			context.dataList.push({'name':p,'value':req.body[p]})
		}
	}
	res.render('home', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
