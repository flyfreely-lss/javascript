var server = require('./chapter06');
var router = require('./router');

server.start(router.route);