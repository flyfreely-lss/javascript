const p1 = new Promise(function(resolve, reject) {
  setTimeout( () => reject(new Error('fail')), 3000 );
});

const p2 = new Promise(function(resolve, reject) {
  setTimeout( () => resolve(p1), 1000 );
});

p2.then( result => console.log(result) )
  .catch( error => console.log(error));


const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});

// 应用 
// 加载图片
const preloadImage = function( path ) {
  return new Promise( (resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  } );
};

// 实现ajax
const getJSON = function( url ){
  const promise = new Promise( (resolve, reject) => {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    const client = new XMLHttpRequest();
    client.open('get', url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  } );
  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});