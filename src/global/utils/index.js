function throttle(fn, duration, delay) {
    let timer = null;
    let begin = new Date();

    return function (...args) {
        let current = new Date();
        let context = this;
        clearTimeout(timer);
        if (current - begin >= duration) {
            fn.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay)
        }
    }
}

function myCall() {
    Function.prototype.myCall = function (context) {
        if (typeof this !== 'function') {
            throw this + 'is not a function';
        }
        context = context || window;
        context.myFn = this;
        let args = [...arguments].slice(1);
        const result = context.myFn(...args);
        delete context.myFn;
        return result;
    }
}

function myApply() {
    Function.prototype.myApply = function (context) {
        if (typeof this !== 'function') {
            throw this + 'is not a function';
        }
        context = context || window;
        context.myFn = this;
        let args = arguments[1] || [];
        const result = context.myFn(...args);
        delete context.myFn;
        return result;
    }
}

function myBind() {
    Function.prototype.newBind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('Error')
        }
        let args = [...arguments].slice(1);
        let fn = this;
        return function F() {
            // 因为返回了一个函数,如果是new的话this就要指向新创建的对象了
            if (this instanceof F) {
                return new fn(...args, ...arguments)
            }
            return fn.apply(context, args.concat(...arguments))
        }
    };
}

export {
    throttle,
    myCall,
    myApply,
    // myBind
};