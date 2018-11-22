// 测试ES5 Array.prototype.reduce
var numbers = [15.5, 2.3, 1.1, 4.7];
//  16+2+1+5 -> 24
function getSum(total, num, currentIndex, arr) {
  console.log(total + ',' + num + ',' + currentIndex + ',' + arr);
  return total + Math.round(num);
}
function test() {
  numbers.reduce(getSum);
    // console.log(numbers.reduce(getSum, 10));
}
test();
