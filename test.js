// 测试Set
// const s = new Set();

// [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

// for (let i of s) {
//   console.log(i);
// }

// let arr = [1, 2, 3];
// let brr = [4, 5];
// arr.push(...brr);
// console.log(arr);

// 测试Array.push()
// let initArr = [1, 2, 3];
// initArr.push(4, 5);
// console.log(initArr);

// // 测试匿名函数
// var outer = null;
// (function(){
// 	var one = 1;
// 	function inner() {
// 		one += 1;
// 		console.log(one);
// 	}
// 	outer = inner;
// })();
// outer();
// outer();
// outer();

// 测试Map
// const map = new Map();

// map.set("name", "Lisa");
// map.set(222, "你才2");
// map.set(undefined, "没定义");

// const hello = () => console.log("hello");
// map.set(hello, "Hello ES6!");

// console.log(map.get(hello));
// console.log(map.get("name"));
// console.log(map.has(222));
　
// 测试reduce
var arr = [1, 2, 3, 4, 5];
// var result = arr.reduce(function(prev, curr) {
// 	console.log(prev + ':' + curr);
// 	return prev + curr;
// });
// console.log(result);

// 测试map、reduce搭配使用
var sum = arr
	.map(function(item) { return 2; })
	.reduce(function(prev, curr) {
		return prev + curr;
	});
console.log(sum);
 

