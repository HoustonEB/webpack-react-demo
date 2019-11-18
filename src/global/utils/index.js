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
};

export {
    throttle
};