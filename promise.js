const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const $Promise = function (executor) {
  this.state = PENDING
  this.value = null
  this.reason = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []
  
  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(callback => {
        setTimeout(() => {
          callback(value)
        }, 0)
      })
    }
  }
  
  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(callback => {
        setTimeout(() => {
          callback(reason)
        }, 0)
      })
    }
  }
  
  try {
    executor(resolve, reject);
  } catch (reason) {
    this.reason = reason
    reject(reason)
  }
}

$Promise.prototype.then = function (onFulfilledCallback, onRejectedCallback) {
  return new $Promise((resolve, reject) => {
    try {
      if (this.state === FULFILLED) {
        const value = onFulfilledCallback(this.value);
        resolve(value);
      } else if (this.state === REJECTED) {
        const value = onRejectedCallback(this.reason);
        resolve(value)
      } else if (this.state === PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          const returnValue = onFulfilledCallback(value);
          resolve(returnValue);
        })
        this.onRejectedCallbacks.push(reason => {
          const returnValue = onRejectedCallback(reason);
          resolve(returnValue)
        })
      }
    } catch (reason) {
      reject(reason)
    }
  })
}

$Promise.prototype.catch = function (onRejectedCallback) {
  return new $Promise((resolve, reject) => {
    if (this.state === REJECTED) {
      try {
        const reason = onRejectedCallback(this.reason)
        resolve(reason)
      } catch (e) {
        reject(e)
      }
    } else if (this.state === PENDING) {
      this.onRejectedCallbacks.push((reason) => {
        const returnValue = onRejectedCallback(reason)
        resolve(returnValue)
      })
    }
  })
}

$Promise.deferred  = function() {
    const defer = {}
    defer.promise = new MyPromise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

module.exports = $Promise;
