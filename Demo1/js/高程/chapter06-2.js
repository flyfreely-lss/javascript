/**
 * Created by lss on 2018/5/3.
 */

// 继承
// 所有函数的默认原型都是Object的实例

/*
* 原型链
*
* 基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。
*
* 构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
*
* 实现原型链有一种基本模式，其代码大致如下：
*/
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}
// 继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

var instance = new SubType();
// 调用instance.getSuperValue()经历的三个搜索步骤：
// 1）搜索实例；
// 2）搜索SubType.prototype；
// 3）搜索SuperType.prototype
// console.log(instance.getSuperValue());


/*
* 借用构造函数（伪造对象/经典继承）
*
* 基本思想：在子类型构造函数的内部调用超类型构造函数。
*
* 缺点：如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，因此函数复用就无从谈起了。
* 而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。
*/
function SuperType(name) {
  this.name = name;
}

function SubType() {
  SuperType.call(this, 'Jack');

  this.age = 29;
}
var instance = new SubType();
console.log(instance.name, instance.age);



/*
* 组合继承(伪经典继承)
*
* 思路：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
*
* 优点：组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为JavaScript中最常用的继承模式。
*
* 缺点：组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
* 子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。
* */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);

  this.age = age;
}
// 继承方法
SubType.prototype = new SubType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);      //"red,blue,green,black"
instance1.sayName();          //"Nicholas";
instance1.sayAge();           //29

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors);      //"red,blue,green"
instance2.sayName();          //"Greg";
instance2.sayAge();           //27



/*
* 原型式继承
*
* 想法：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。
*
* 分析：在没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式继承是完全可以胜任的。
* 不过别忘了，包含引用类型值的属性始终都会共享相应的值，就像使用原型模式一样。
*/
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = object(person);
anotherPerson.name = "Lisa";
anotherPerson.friends.push('Jack');

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Bob";
yetAnotherPerson.friends.push('Alice');

console.log(person.friends); // [ 'Shelby', 'Court', 'Van', 'Jack', 'Alice' ]

// ECMAScript 5通过新增Object.create()方法规范化了原型式继承。
// 这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。
// 在传入一个参数的情况下，Object.create()与object()方法的行为相同。


/*
* 寄生式继承
*
* 思路：与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。
*
* 分析：在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。
* 前面示范继承模式时使用的object()函数不是必需的；
* 任何能够返回新对象的函数都适用于此模式。
*/
function createAnother(original){
  var clone = Object(original);    //通过调用函数创建一个新对象
  clone.sayHi = function(){        //以某种方式来增强这个对象
    console.log("hi");
  };
  return clone;                    //返回这个对象
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"



/*
* 寄生组合式继承：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
*
* 基本思路：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
* 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。
*
* 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
*/
function inheritPrototype(subType, superType) {
  // var prototype = object(subType.prototype);
  var prototype = Object.create(subType.prototype); // 可与上句代码相互替代
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);

  this.age = age;
}
// 继承方法
// SubType.prototype = new SubType();
// SubType.prototype.constructor = SubType;
inheritPrototype(SubType, SubType);
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);      //"red,blue,green,black"
instance1.sayName();          //"Nicholas";
instance1.sayAge();           //29
//
var instance2 = new SubType("Greg", 27);
console.log(instance2.colors);      //"red,blue,green"
instance2.sayName();          //"Greg";
instance2.sayAge();           //27