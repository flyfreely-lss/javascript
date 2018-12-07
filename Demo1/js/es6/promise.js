const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});

p2.then(result => console.log(result))
  .catch(error => console.log(error));


const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function () {
  return someOtherAsyncThing();
}).catch(function (error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function (error) {
  console.log('carry on', error);
});

// 应用 
// 加载图片
const preloadImage = function (path) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  });
};

// 实现ajax
const getJSON = function (url) {
  const promise = new Promise((resolve, reject) => {
    const handler = function () {
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
  });
  return promise;
};

getJSON("/posts.json").then(function (json) {
  console.log('Contents: ' + json);
}, function (error) {
  console.error('出错了', error);
});


// Promise.resolve(value)
Promise.resolve(66).then(function (value) {
  console.log(value);
});

// then 中指定的方法调用是异步进行的
var promise = new Promise(function (resolve, reject) {
  console.log(1);
  resolve(3);
});
promise.then(function (value) {
  console.log(value);
});
console.log(2);

// Promise chain
function taskA() {
  console.log("Task A");
  // throw new Error("throw Error @ Task A");
}
function taskB() {
  console.log("Task B");
}
function onRejected(error) {
  console.log("Catch Error: A or B", error);
}
function finalTask() {
  console.log("Final Task");
}
Promise.resolve()
  .then(taskA)
  .then(taskB)
  .catch(onRejected)
  .then(finalTask);

// promise chain 中传递参数
function doubleUp(value) {
  return value * 2;
}
function increment(value) {
  return value + 1;
}
function output(value) {
  console.log(value);// => (1 + 1) * 2JavaScript Promise

}
var promise = Promise.resolve(1);
promise
  .then(increment)
  .then(doubleUp)
  .then(output)
  .catch(function (error) {
    // promise chain中出现异常的时候会被调用
    console.error(error);
  });

// 1: 对同一个promise对象同时调用 `then` 方法
var aPromise = new Promise(function (resolve) {
  resolve(100);
});
aPromise.then(function (value) {
  return value * 2;
});
aPromise.then(function (value) {
  return value * 2;
});
aPromise.then(function (value) {
  console.log("1: " + value); // => 100
});

// 2: 对 `then` 进行 promise chain 方式进行调用
var bPromise = new Promise(function (resolve) {
  resolve(100);
});
bPromise.then(function (value) {
  return value * 2;
}).then(function (value) {
  return value * 2;
}).then(function (value) {
  console.log("2: " + value); // => 100 * 2 * 2
});


// 通过回调方式来进行多个异步调用
function getURLCallback(URL, callback) {
  var req = new XMLHttpRequest();
  req.open('GET', URL, true);
  req.onload = function () {
    if (req.status === 200) {
      callback(null, req.responseText);
    } else {
      callback(new Error(req.statusText), req.response);
    }
  };
  req.onerror = function () {
    callback(new Error(req.statusText));
  };
  req.send();
}
// <1> 对JSON数据进行安全的解析
function jsonParse(callback, error, value) {
  if (error) {
    callback(error, value);
  } else {
    try {
      var result = JSON.parse(value);
      callback(null, result);
    } catch (e) {
      callback(e, value);
    }
  }
}
// <2> 发送XHR请求
var request = {
  comment: function getComment(callback) {
    return getURLCallback('http://azu.github.io/promises-book/json/comment.json', jsonParse.bind(null,
      callback));
  },
  people: function getPeople(callback) {
    return getURLCallback('http://azu.github.io/promises-book/json/people.json', jsonParse.bind(null,
      callback));
  }
};
// <3> 启动多个XHR请求，当所有请求返回时调用callback
function allRequest(requests, callback, results) {
  if (requests.length === 0) {
    return callback(null, results);
  }
  var req = requests.shift();
  req(function (error, value) {
    if (error) {
      callback(error, value);
    } else {
      results.push(value);
      allRequest(requests, callback, results);
    }
  });
}
function main(callback) {
  allRequest([request.comment, request.people], callback, []);
}
// 运行的例子
main(function (error, results) {
  if (error) {
    return console.error(error);
  }
  console.log(results);
});

// 使用then实现
function getURL(URL) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}
var request = {
  comment: function getComment() {
    return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
  },
  people: function getPeople() {
    return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
  }
};
function main() {
  function recordValue(results, value) {
    results.push(value);
    return results;
  }
  // [] 用来保存初始化的值
  var pushValue = recordValue.bind(null, []);
  return request.comment().then(pushValue).then(request.people).then(pushValue);
}
// 运行的例子
main().then(function (value) {
  console.log(value);
}).catch(function (error) {
  console.error(error);
});


var winnerPromise = new Promise(function (resolve) {
  setTimeout(function () {
    console.log('this is winner');
    resolve('this is winner');
  }, 4);
});
var loserPromise = new Promise(function (resolve) {
  setTimeout(function () {
    console.log('this is loser');
    resolve('this is loser');
  }, 1000);
});
// 第一个promise变为resolve后程序停止
Promise.race([winnerPromise, loserPromise]).then(function (value) {
  console.log(value); // => 'this is winner'
});