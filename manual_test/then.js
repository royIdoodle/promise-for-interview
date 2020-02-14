  // 通过then注册回调
  const p = new Promise(resolve => {
    setTimeout(() => {
      resolve('foo')
    }, 500)
  })
  
  p.then(value => {
    console.log('resolve 1:', value)
  })
  
  p.then(value => {
    console.log('resolve 2:', value)
  })
  
  // 500ms后 输出
  // resolve 1: foo
  // resolve 2: foo