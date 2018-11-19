/**
 *  Node.js 应用是由哪几部分组成的：
 *    1.引入 required 模块：我们可以使用 require 指令来载入 Node.js 模块。
 *    2.创建服务器：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
 *    3.接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。
 */
const http = require( 'http' );

http.createServer( function (req, res) {
  res.writeHead( 200, { 'Content-Type': 'text/plain' } );
  res.end( 'Hello world' );
} ).listen( 8888 );

console.log('Server running at http://127.0.0.1:8888/');