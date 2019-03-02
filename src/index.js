import a from './a'
require('./index.css')
require('./index.less')
// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery'

let number = 12345678432421432143215132
console.log(number)
class A {
  a = '我是被打印的'
}
let getClass = new A()
console.log(getClass.a)
