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

function resolveNext (callback, value, resolve, reject) {
  if (typeof callback === 'function') {
    try {
      const returnValue = callback(value)
      if (returnValue instanceof $Promise) {
        returnValue.then(resolve, reject)
      } else {
        resolve(returnValue)
      }
    } catch (reason) {
      reject(reason)
    }
  } else {
    resolve(callback)
  }
}

$Promise.prototype.then = function (onFulfilledCallback, onRejectedCallback) {
  return new $Promise((resolve, reject) => {
    try {
      if (this.state === FULFILLED) {
        resolveNext(onFulfilledCallback, this.value, resolve, reject)
      } else if (this.state === REJECTED) {
        resolveNext(onRejectedCallback, this.reason, resolve, reject)
      } else if (this.state === PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          resolveNext(onFulfilledCallback, value, resolve, reject)
        })
        this.onRejectedCallbacks.push(reason => {
          resolveNext(onRejectedCallback, reason, resolve, reject)
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
      resolveNext(onRejectedCallback, this.reason, resolve, reject)
    } else if (this.state === PENDING) {
      this.onRejectedCallbacks.push((reason) => {
        resolveNext(onRejectedCallback, reason, resolve, reject)
      })
    }
  })
}

// mocha测试用
$Promise.deferred  = function() {
    const defer = {}
    defer.promise = new $Promise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

module.exports = $Promise;
