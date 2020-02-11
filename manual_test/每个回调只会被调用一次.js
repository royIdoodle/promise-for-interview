// Promise的状态一旦变更，则不可逆转
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
