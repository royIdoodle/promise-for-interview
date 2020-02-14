
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

  
  new Promise(function(resolve, reject) {
  //  成功的时候调用 resolve()，并将Promise的状态变更为fulfilled
  //  失败的时候调用 reject()，并将Promise的状态变更为rejected
  })
  
  
  