import {observable, action} from 'mobx';

// let num = observable.map({a: 3});
let num = observable.box(1);
const data = function() {
    setTimeout(action(() => {
        console.log('2');
        num.set(2);
    }), 2000);
};

export {
    data
}
export function getData() {
    return num.get();
}