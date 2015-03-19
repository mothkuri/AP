var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var userController = require('./app/routes/User');
var loginController = require('./app/routes/login');
var logoutController = require('./app/routes/logout');
var authController = require('./app/routes/authorization/auth');
var oauth2Controller = require('./app/routes/authorization/oAuth2');
var clientController = require('./app/routes/authorization/Client');
var session = require('express-session');
var authController = require('./app/routes/authorization/auth');
var passwordService = require('./app/services/PasswordServices');

var mongoose = require('mongoose');
var multipart = require('connect-multiparty');



var app = express();
var router = express.Router();
var RRule = require('rrule').RRule;

app.use(multipart({
    uploadDir: __dirname+'/public/uploads'
}));
//include jobs here
var job = require('./app/jobs/PasswordStatusJob');

//logger config
var log4js = require('log4js');
var date = new Date();
var curr_date = date.getDate();
var curr_month = date.getMonth()+1;
var curr_year = date.getFullYear();
var formattedDate = curr_date +'-'+curr_month+'-'+curr_year;
//log the cheese logger messages to a file, and the console ones as well.
log4js.configure({
  appenders: [
      {
          type: "file",
          filename: "AssociatePortal_"+formattedDate+".log",
          maxLogSize: 2048,
          backups: 3,
          category: [ 'AssociatePortal','console' ]
      },
      {
          type: "console"
      }
  ],
  replaceConsole: true
});


// Use express session support since OAuth2orize requires it
app.use(session({
	secret : 'Super Secret Session Key',
	saveUninitialized : true,
	resave : true
}));
// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());


// include custom routes here
var asset = require('./app/routes/asset/Asset');
var associate = require('./app/routes/associate/Associate');
var index = require('./app/routes/index');
var room = require('./app/routes/room/Room');
var booking = require('./app/routes/booking/Booking');
var meeting = require('./app/routes/meeting/Meetings');

var login = require('./app/routes/login/login');
var signUp = require('./app/routes/signUp/signUp');
var admin = require('./app/routes/admin/admin');
var programme=require('./app/routes/programme/Programme');
var event = require('./app/routes/event/Event');
var expenditureReport = require('./app/routes/event/ExpenditureReport');
var group = require('./app/routes/event/Group');
var updatePassword = require('./app/routes/login/UpdatePassword');
var dropDatabase = require('./app/routes/DropDatabase');
// all api calls go through this
app.use('/api', authController.isBearerAuthenticated, function(req, res, next) {
	next();
});


app.use('/signUp', signUp);
app.use('/', index);
app.use('/login', loginController);
app.use('/logout', logoutController);

// use custom api routes here
app.use('/api/associate', associate);
app.use('/api/room', room);
app.use('/api/booking', booking);
app.use('/api/users', userController);
app.use('/api/admin', admin);
app.use('/api/login', login);
app.use('/api/programme', programme);
app.use('/api/meeting', meeting);

// all app calls go through this
app.use('/app', authController.isLoggedin, function(req, res, next) {
	console.log('in app:'+req.method);
	
	if(!(req.method=='POST' && req.path==='/associate')){
		if(!req.session.user.isProfileComplete){
			res.send({isProfileComplete:false});
		}
		else{
			next();
		}
	}
	else{
		next();
	}
	
	
			
});

// use custom app routes here
app.use('/app/asset', asset);
app.use('/app/associate', associate);
app.use('/app/room', room);
app.use('/app/booking', booking);
app.use('/app/users', userController);
// app.use('/app/oauth2', oauth2Controller);
app.use('/app/clients', clientController);
app.use('/app/admin', admin);
app.use('/app/programme', programme);
app.use('/app/meeting', meeting);
app.use('/app/events', event);
app.use('/app/expenditureReport', expenditureReport);
app.use('/app/groups', group);
app.use('/updatePassword',updatePassword);
app.use('/app/dropDatabase',dropDatabase);

app.get('/sign',function(req,res){
	res.render('login');
});
// Create endpoint handlers for oauth2 authorize
app.get('/app/oauth2/authorize', authController.isLoggedin,
		oauth2Controller.authorization);
app.post('/app/oauth2/authorize', authController.isLoggedin,
		oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
app.post('/oauth2/token', authController.isClientAuthenticated,
		oauth2Controller.token);

//Handing the routing to angular router
app.get('*', function(req, res) {
	console.log('in ang route:'+ req.url);
		if(typeof req.session.user==='undefined'){
			console.log('not logged in');
			res.redirect('../login');
		}
		else {
			res.sendfile('./public/index_home.html');
		}
		
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	mongoose.connect('mongodb://localhost/AssociatePortal');
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}
else{
	// self db on openshift
	 mongoose.connect('mongodb://admin:D9iULILnQZmb@127.2.41.130:27017/associateportal');

	// mongolab
	// mongoose.connect('mongodb://associate:associate@ds027771.mongolab.com:27771/associateportal');
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : {}
		});
	});
}



// app.use('/api', router);
module.exports = app;
