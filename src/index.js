import a from './a'
require('./index.css')
require('./index.less')
console.log(a)
var number = 12345678432421432143215132
var number2 = number.toLocaleString()
var arr = ['1', [12, [23, [23]]]]
console.log(number2)
console.log('hello')
console.log(arr.toString())
var c = 0
function print() {
  console.log(window.c)
}
function plus() {
  setTimeout(() => {
    c += 1
  }, 1000)
}
plus()
print()
