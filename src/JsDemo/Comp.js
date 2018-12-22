import React, {Component} from 'react';
import {observable} from 'mobx';

export default class View extends Component {

    constructor(props) {
        super(props);
        // this.init();
        // this.foo();
        this.handleErrorPromise();
    }

    init() {
        Promise.resolve('first-value').then(v => {
            console.log(v);
        });
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('timeout');
                resolve(1)
            }, 1000)
        }).then(val => {
            console.log(val + 1);
        });
    }

    // 2-async基本使用 await接受Promise对象和普通数据类型 async返回Promise对象,相当于Promise.resolve包装了一下

    async foo() {
        const val = await this.asyncTest();
        console.log(val, 'val')
    }

    asyncTest() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('async-timeout');
                resolve(99)
            }, 2000)
        })
    }

    // 3-异步代码中如果报错,就会报错停止执行下边的代码.需要进行错误处理
    async handleErrorPromise() {
        try {
            const num1 = await this.testError1();
        } catch(e) {
            console.log(e, 'e')
        }
        // promise报错会阻止下边代码的执行,所以在有些情况仍然需要执行后续代码,需要用try,catch捕捉
        const num2 = await this.testError2();
        console.log(num2);
    }

    testError1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // throw new Error('报错了');
                reject(22)

            }, 1000)
        })
    }

    testError2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(33)
            }, 1000)
        })
    }

    render() {
        return (
            <div className={'structure-tree-wrapper'}>
              1
            </div>
        )
    }
}