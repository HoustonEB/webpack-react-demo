function promise() {
    let ui = new Promise((resolve, reject) => {
        setTimeout((value) => {
            resolve(value);
        }, 2000, 100)
    }).then(value => {
        console.log(value, 'resolve')
    }, err => {
        console.log(err, 'err')
    }).finally(() => {
        console.log('finally');
    }).catch(err => {
        console.log(err, 'err')
    })
}

function _Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.data = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(value) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'fulfilled';
                self.data = value;
                self.onResolvedCallback.forEach(callback => callback(value));
            }
        });
    }

    function reject(reason) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = reason;
                self.onRejectedCallback.forEach(callback => callback(reason));
            }
        });
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function loadPromise() {
    window._Promise = _Promise;
    _Promise.prototype.then = function (onResolved, onRejected) {
        let self = this;
        let promise2;

        onResolved = typeof onResolved === 'function' ? onResolved : function (value) {
        };
        onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
        };

        if (self.status === 'pending') {
            return promise2 = new _Promise(function (resolve, reject) {
                self.onResolvedCallback.push(function (value) {
                    try {
                        let x = onResolved(self.data);
                        if (x instanceof _Promise) {
                            x.then(resolve, reject);
                        } else {
                            resolve(x);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });

                self.onRejectedCallback.push(function (reason) {
                    try {
                        let x = onRejected(self.data);
                        if (x instanceof _Promise) {
                            x.then(resolve, reject)
                        } else {
                            resolve(x)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

        if (self.status === 'fulfilled') {
            return promise2 = new _Promise(function (resolve, reject) {
                try {
                    let x = onResolved(self.data);
                    if (x instanceof _Promise) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }

        if (self.status === 'rejected') {
            return promise2 = new _Promise(function (resolve, reject) {
                try {
                    let x = onRejected(self.data);
                    if (x instanceof _Promise) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            })
        }
    };

    _Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected)
    };
}


export {
    promise,
    loadPromise
}