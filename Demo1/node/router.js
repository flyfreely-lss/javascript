function route(pathname, res) {
    console.log("About to route a request for " + pathname);
    if('/' === pathname) {
        res.writeHead(200, {"contentType": "text/plain"});
        res.write('Hello world!');
        res.end();
    }else if('/index/home' === pathname) {
        res.end('index/home');
    }else {
        res.end('404');
    }
  }
   
exports.route = route;