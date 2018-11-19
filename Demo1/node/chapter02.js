const fs = require( 'fs' );

/**
 * 阻塞 同步
 */
// let data = fs.readFileSync( 'example.txt' );
// console.log( data );
// console.log( data.toString() );


/**
 * 非阻塞 异步
 */
fs.readFile( 'example.txt', function ( err, data ) {
  if( err ) return console.log( err );
  console.log( data.toString() );
} );
console.log('程序执行结束!');
