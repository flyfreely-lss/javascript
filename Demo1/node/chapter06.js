// nodejs路由
var http = require('http');
var url = require('url');

function start(route) {
    function onRequest( req, res ) {
        var pathName = url.parse(req.url).pathname;
        console.log("Request for " + pathName + " received.");

        route(pathName, res);
    }

    http.createServer( onRequest ).listen(8888);
    console.log("Server has started.");
}

exports.start = start;