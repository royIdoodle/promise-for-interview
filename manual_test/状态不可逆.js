 
  // Promise的状态一旦变更，则不可逆转
  const p = new Promise((resolve, reject) => {
    resolve('foo')
    setTimeout(() => {
      reject('bar')
    }, 200)
  })
  
  p.then(value => {
    console.log('resolve value:', value)
  })
  
  p.catch(reason => {
    console.log('reject reason:', reason)
  })
  
  // 输出
  // resolve value: foo
  // catch回调不会被调用