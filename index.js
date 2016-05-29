/**
 * Module dependencies.
 */
/* eslint-disable fecs-indent, no-console */
var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var timeUsing = require('time-using-middleware');

var app = module.exports = express();

// settings

// set our default template engine to "jade"
// which prevents the need for extensions
app.set('view engine', 'jade');

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// define a custom res.message() method
// which stores messages in the session
app.response.message = function (msg) {
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// log
if (!module.parent) {
  app.use(logger('dev'));
}

// serve static files
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// session support
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}));

// parse request bodies (req.body)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// expose the "messages" local variable when views are rendered
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !!msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});


var measureUrlPatterns = [
    {
        pattern: /^\/test.*performance-testing$/,
        pageName: 'testDemoPage'
    },
    {
        pattern: /^\/app\/announcement.*performance-testing$/,
        pageName: 'appAnnouncement'
    }
];

app.use(timeUsing({
    measureUrlPatterns: measureUrlPatterns,
    logPath: '/log/timeUsing/',
    runtimePath: path.resolve(__dirname, './')
}));

// load controllers
// require('./lib/boot')(app, { verbose: !module.parent });

app.post('/tu/finish', timeUsingCollectFinish);
app.post('/tu/add', timeUsingCollectAdd);

app.get('/test', function (req, res, next) {
  var now = new Date().getTime();
  var randomWait = parseInt(Math.random() * 2000, 10);
  var costTimeObj = {};

  setTimeout(function () {
    res.render('index', {wait: randomWait});

    if (req.mtKey) {
      costTimeObj.allNodeApiFinishTime = new Date().getTime() - req.pageStartTime;
      costTimeObj['/test'] = new Date().getTime() - now;
      costTimeObj.mtKey = req.mtKey;
      timeUsing.addTimeRecord(costTimeObj,
        {
          success: function () {

          },
          error: function () {

          }
        }
      );
    }
  }, randomWait);
});

function timeUsingCollectFinish(req, res, next) {
    var data = req.body;

    if (req.cookies.mtKey) {
        data.mtKey = req.cookies.mtKey;
        timeUsing.finishRecording(res, data, {
            success: function () {
                res.send({code: 200});
            },
            error: function () {
                res.send({code: 0});
            }
        });
    }
    else {
        res.send({code: 0});
    }
}

function timeUsingCollectAdd(req, res, next) {
    var data = req.body;

    if (req.cookies.mtKey) {
        data.mtKey = req.cookies.mtKey;
        timeUsing.addTimeRecord(data, {
            success: function () {
                res.send({code: 200});
            },
            error: function () {
                res.send({code: 0});
            }
        });
    }
    else {
        res.send({code: 0});
    }
}

app.use(function (err, req, res, next) {
  // log it
  if (!module.parent) {
    console.error(err.stack);
  }

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function (req, res, next) {
  res.status(404).render('404', {url: req.originalUrl});
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
/* eslint-enable fecs-indent, no-console */
