const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED;
                    this.value = value;
                    this.onFulfilledCallbacks.forEach((cb) => {
                        cb(value);
                    });
                }
            });
        };

        const reject = (reason) => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = REJECTED;
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach((cb) => {
                        cb(reason);
                    });
                }
            });
        };

        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled === 'function') {
            this.onFulfilledCallbacks.push(onFulfilled);
        }
        if (typeof onRejected === 'function') {
            this.onRejectedCallbacks.push(onRejected);
        }
    }

    catch(onRejected) {
        if (typeof onRejected === 'function') {
            this.onRejectedCallbacks.push(onRejected);
        }
    }
}

MyPromise.deferred  = function() {
    const defer = {}
    defer.promise = new MyPromise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

module.exports = MyPromise;
