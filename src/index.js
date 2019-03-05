import a from './a'
import logo from './avatar.png'
let image = new Image()
console.log(logo)
image.src = logo
document.body.appendChild(image)
require('./index.css')
require('./index.less')
let number = 12345678432421432143215132
console.log(number)
class A {
  a = '我是被打印的'
}
let getClass = new A()
console.log(getClass.a)
