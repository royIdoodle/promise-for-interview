// catch
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('foo')
  }, 500)
})

// Promise实例的then方法第二个参数和catch可以注册异常的回调
p.then(null, reason => {
  console.log('reject reason 1:', reason)
})

p.catch(reason => {
  console.log('reject reason 2:', reason)
})

p.catch(reason => {
  console.log('reject reason 3:', reason)
})

// 输出
// reject reason 1: foo
// reject reason 2: foo
// reject reason 3: foo



// Promise构造函数内部出现异常，也会想
const p2 = new Promise((resolve, reject) => {
  foo()
})

p2.catch(reason => {
  console.log('reject reason 4:', reason)
})

// 输出
// reject reason 4: ReferenceError: foo is not defined
// ...