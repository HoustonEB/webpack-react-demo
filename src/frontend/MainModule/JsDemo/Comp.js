import React, {Component} from 'react';
import {observable, computed, reaction, action} from 'mobx';
import {observer} from 'mobx-react';
import Sort from '../DragSort/Comp.js';

@observer
export default class View extends Component {

@observable count = 0;
@observable user;
@observable name = 'jack';
@observable sortData = [
    { id: 0, title: '0', name: 'a'},
    { id: 1, title: '1', name: 'b' },
    { id: 2, title: '2', name: 'c' },
    { id: 3, title: '3', name: 'd' },
    { id: 4, title: '4', name: 'e' },
    { id: 5, title: '5', name: 'f' },
    { id: 6, title: '6', name: 'g' },
    { id: 7, title: '7', name: 'h' },
    { id: 8, title: '8', name: 'i' },
    { id: 9, title: '9', name: 'j' }
];

    constructor(props) {
        super(props);
        // this.init();
        // this.foo();

        // this.handleErrorPromise();
        setTimeout(() => {
            this.count++
        }, 3000);
        reaction(
            () => this.count, // 数据函数
            (count, reaction) => { // 效果函数,只对数据函数中访问的数据做出反应.
                console.log('count=', count);
                // reaction.dispose(); // 清理掉reaction,之后在进行count的修改,不进入这个reaction函数.
            },
            {
                fireImmediately: true
            }
        );
        console.log(this.name, 'con')
    }

    get upperCaseName () {
        this.name = this.name.toUpperCase();
        return this.name;
    }

    @computed
    get actionName() {
        return this.name + '计算属性'
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

    @action
    handleUpdateData(data) {
        this.sortData = data;
    }

    renderSortContent() {
        let dom = this.sortData.map((item, index) => {
            return (
                <li key={item.id}>{item.name}</li>
            )
        });
        return (
            <ul>
                {dom}
            </ul>
        )
    }

    render() {
        return (
            <div>
                {this.count}
                <button onClick={() => {this.name = 'super'}}>修改计算属性</button>
                {this.actionName}
                <Sort sortData={this.sortData} displayTitle={'name'} onChange={(data) => this.handleUpdateData(data)}/>
                {this.renderSortContent()}
                <button onClick={() => {console.log(this.upperCaseName, 'upperCaseName')}}>test</button>
            </div>
        )
    }
}