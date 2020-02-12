// then方法注册的回调只会被调用一次
const p = new Promise((resolve, reject) => {
  resolve('foo')
  setTimeout(() => {
    resolve('foo 1')
  }, 500)
  
  setTimeout(() => {
    resolve('foo 2')
  }, 1000)
})

p.then(value => {
  console.log('resolve value:', value)
})
// 输出
// resolve value: foo
// foo 2 foo 3都不会输出
