const events = require( 'events' );

let eventEmitter = new events.EventEmitter();

eventEmitter.on( 'connection', function () {
  console.log('连接成功...');

  eventEmitter.emit( 'data_received' );
} );

eventEmitter.on( 'data_received', function () {
  console.log( '数据接收成功...' );
} );

eventEmitter.emit( 'connection' );

console.log( '执行完毕' );

eventEmitter.on( 'someEvent', function ( arg1, arg2 ) {
  console.log( 'listener1', arg1, arg2 );
} );

eventEmitter.on( 'someEvent', function ( arg1, arg2 ) {
  console.log( 'listener2', arg1, arg2 );
} );

eventEmitter.on( 'newListener', function () {
  console.log('delete...');
} );

eventEmitter.on( 'error', function () {
  console.log('error');
} );

eventEmitter.emit( 'someEvent', '参数1', '参数2' );
eventEmitter.emit('error');

//返回指定事件的监听器数组
console.dir( eventEmitter.listeners('someEvent') );
// 返回指定事件的监听器数量
console.log( eventEmitter.listenerCount('someEvent') );