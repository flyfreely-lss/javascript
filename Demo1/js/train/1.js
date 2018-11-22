// 测试undifined
(function(window, undefined){
  undefined = 3;
  console.log(undefined); //3
})(window);
// console.log(undefined); //undifined

// 测试变量提升
var a;
(function test() {
  console.log(a); //undefined
  var a = 10;
  // console.log(a); //10
})();
console.log(a); //undefined

// 测试函数提升 - 函数提升的优先级大于变量提升
(function test() {
  var a = 10;
  function a() {}
  console.log(a); //10
})();

// 测试继承
// 父类
function Car(color) {
  this.color = color;
}
Car.prototype.sale = function() {
  console.log(this.color + '的车卖了20k');
}
// console.dir(Car); Car.__proto__ === Function.prototype  Function.__proto__ = Object.prototype
// 子类
function BWM(color) {
  Car.call(this, color); //属性继承
}
// 方法继承
var _proto = Object.create(Car.prototype);
_proto.constructor = BWM;
BWM.prototype = _proto;

var bwm = new BWM('红色');
bwm.sale();
console.log(bwm);
console.dir(Car);


// 测试原型链
function Foo() {

}
Foo.prototype.say = function(){
  Console.log('hello');
}
var f1 = new Foo();
console.log(f1);
console.dir(f1.say);