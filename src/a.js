require('@babel/polyfill')
let str = {
  strData: '我是a.js文件',
  classData: class B {
    b = 0
  },
  function: function* gan() {
    yield 1
  }
}
console.log(str.function.gan().next())

module.exports = str
