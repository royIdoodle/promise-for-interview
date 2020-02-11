// then和catch返回的都是promise实例
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 200)
})

// then回调中的返回值会被它后面的then拿到
let p1 = p.then(value => {
  return value + 100
})

p1.then(value => {
  console.log('resolve p1 value:', value)
})

// 输出
// resolve p1 value: 101

// then回调中的返回值如果是一个Promise实例，会被递归展开
let p2 = p.then(value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value + 2)
    })
  })
})

p2.then(value => {
  console.log('resolve p2 value:', value)
})

// 输出
// resolve p2 value: 3