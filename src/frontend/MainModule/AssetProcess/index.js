import React, {Component} from 'react';
import './style.use.less';
import Cat from './cat.jpg';

// 第一种写法
export let test = 190;

// 第二种写法(推荐)
let test1 = 1;
let test2 = 2;
let sum = function (test1, test2) {
   return test1 + test2
}

export {test1, test2, sum};

setTimeout(() => {
    test1 = 100;
}, 500);

// console.log(this, 23) // undefined
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 12
        }
    }

    render() {
        // console.log(this, 24) // this class
        return (
            <div className={'asset-process-wrapper'}>
                <img src={Cat}/>
                <img src={Cat}/>
            </div>
        )
    }
}