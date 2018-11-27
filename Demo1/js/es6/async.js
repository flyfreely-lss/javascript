// 指定多少毫秒后输出一个值
function timeout(ms) {
  return new Promise( (resolve) => {
    setTimeout( resolve, ms );
  } );
}

async function asyncPrint( value, ms ) {
  console.log('开始');
  try {
    await timeout( ms );
  } catch (error) {
    console.log(error);
  }
  console.log(value);
}

asyncPrint( 'Hello world!', 5000 );