/**
 * Created by lss on 2017/7/24.
 */

// 创建对象的方式

/*
* 式一：工厂模式
* 缺点：未解决对象识别的问题（即怎样知道对象的类型）
*/
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  }
  return o;
}

var person1 = createPerson('jack', 25, 'egineer');
person1.sayName();
var person2 = createPerson('Lisa', 24, 'egineer');
person2.sayName();

/*
* 方式二：构造函数模式
* 实现1
* 缺点：每个方法都要在每个实例上创建一遍
*/
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {  // 逻辑上等价于 this.sayName = new Function('console.log(this.name)')
        console.log(this.name);
    }
}

var person3 = new Person('jack', 25, 'egineer');
var person4 = new Person('Lisa', 24, 'egineer');

// 实现2（对于实现1的改进）：
// 缺点：① 在全局作用域下定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实；
//      ② 如果对象需要很多方法，那么就要定义很多全局函数，以致于自定义的引用类型毫无封装性可言。
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName() {

  console.log(this.name);
}

var person5 = new Person('jack', 25, 'egineer');
var person6 = new Person('Lisa', 24, 'egineer');

/*
* 方式三：原型模式
* 实现1
* 缺点：每添加一个属性和方法就要敲一遍Person.prototype
*/
function Person() {}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 24;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person7 = new Person();
var person8 = new Person();
// 当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性
// 即添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。
person7.name = 'Greg';
console.log(person7.name);
console.log(person8.name);

// 使用delete操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性
delete person7.name;
console.log(person7.name);

// 实现2（对于实现1的改进）
// 缺点：
function Person() {}
Person.prototype = {
  // constructor : Person, // 这种重设constructor属性的方式会导致它的[[Enumerable]]特性被设置为true。默认情况下，原生的constructor属性是不可枚举的
  name: 'Nicholas',
  age: 24,
  job: 'Software Engineer',
  sayName: function() {
    console.log(this.name);
  }
};

//重设构造函数，只适用于ECMAScript 5兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});

var friend = new Person();
console.log(friend instanceof Object);
console.log(friend instanceof Person);
console.log(friend.constructor == Person);
console.log(friend.constructor == Object);

// 原生对象的原型
console.log(typeof Array.prototype.sort);
console.log(typeof String.prototype.substring);

// 通过修改原生对象的原型，给基本包装类型String添加一个名为startsWith()的方法。
String.prototype.startsWith = function (text) {
  return this.indexOf(text) == 0;
};
console.log(String.prototype.startsWith);
var msg = "Hello world!";
console.log(msg.startsWith('hello'));

// 原型对象的问题
// 缺点：① 省略了为构造函数传参这一环节，导致所有实例在默认情况下都将取得相同的值
//      ② 共享原型属性导致的引用类型值的属性无法私有化，如下：
function Person() {}

Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 24,
  job: 'Software Engineer',
  friends: ['Lisa', 'Alice'],
  sayName: function () {
    console.log(this.name);
  }
};

var person9 = new Person();
var person10 = new Person();

person9.friends.push('Bob');
console.log(person9.friends);
console.log(person10.friends);
console.log(person9.friends === person10.friends);

/*
* 方式四：组合使用构造函数模式和原型模式
* 构造函数用于定义实例属性；原型模式用于定义方法和共享的属性
* 这种模式，是目前在ECMAScript中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。
*/
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Alice', 'John'];
}

Person.prototype = {
  constructor: Person,
  sayName: function () {
    console.log(this.name);
  }
};

var person11 = new Person('Lisa', 24, 'Software Engineer');
var person12 = new Person('Jack', 26, 'Doctor');

person11.friends.push('Jean');
console.log(person11.friends);
console.log(person12.friends);
console.log(person11.friends === person12.friends);
console.log(person11.sayName === person12.sayName);

/*
方式四：动态原型模式
注意：使用动态原型模式时，不能使用对象字面量重写原型。前面已经解释过了，如果在已经创建了实例的情况下重写原型，
那么就会切断现有实例与新原型之间的联系。
*/
function Person1(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  if(typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
      console.log(this.name);
    }
  }
}

/*
方式五：寄生构造函数模式
基本思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。
缺点：返回的对象与构造函数或者与构造函数的原型属性之间没有关系，即构造函数返回的对象与在构造函数外部创建的对象没有什么不同。
使用：建议在可以使用其他模式的情况下，不要使用这种模式。
*/
function Person2(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}
var friend = new Person2('Nicholas', 24, 'Doctor');
friend.sayName();

// 假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改Array构造函数，因此可以使用这个模式。
function SpecialArray() {
  var values = new Array();

  values.push.apply(values, arguments);

  values.toPipeString = function () {
    return this.join('|');
  };

  return values;
}
var colors = new SpecialArray('red', 'green', 'blue');
console.log(colors.toPipeString());

/*
方式六：稳妥构造函数模式
定义：指的是没有公共属性，而且其方法也不引用this的对象。
稳妥构造函数遵循与寄生构造函数类似的模式，不同：①新创建对象的实例方法不引用this；②不使用new操作符调用构造函数。
使用：适合在某些安全执行环境——例如，ADsafe（www.adsafe.org）和Caja（http://code.google.com/p/google-caja/）提供的环境——下使用。
注意：与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此instanceof操作符对这种对象也没有意义。
*/
function Person3(name, age, job) {
  var o = new Object();

  o.sayName = function () {
    console.log(name);
  };
  return o;
}
var friend = Person3("Nicholas", 29, "Software Engineer");
// 变量friend中保存的是一个稳妥对象，而除了调用sayName()方法外，没有别的方式可以访问其数据成员。
friend.sayName();  //"Nicholas"