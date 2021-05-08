import React, { Component, PureComponent } from 'react';

export default class EventLoop extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
        执行栈为空去检查宏任务队列是否为空,为空去执行微任务队列全部执行完.
        如果不为空,则执行宏任务,之后去检查微任务队列是否为空,为空则执行宏任务中的任务,否则执行微任务中任务.
        分析: 1.主线程执行js代码,输出'start'.
             2.将setTimeout1和setTimeout2加入宏任务队列中.
             3.输出'end'.
             4.此时执行栈中为空,回去将宏任务队列中的setTimeout1的回调加入执行栈中执行,输出'setTimeout1',并将setTimeout1-1加入宏任务队列末尾(队列是先进先出的原则)
             5.此时执行栈为空,将宏任务队列里的setTimeout2的回调加入执行栈中执行,输出'setTimeout2'.此时将微任务promise2加入微任务队列中,并执行,输出'2 promise2'.
             6.此时微任务队列和执行栈为空,去宏任务中,将setTimeout1-1加入执行栈中执行,输出'setTimeout1-1',并添加微任务promise1,并执行,输出'promise1'.
        结果:
            start
            end
            setTimeout1
            setTimeout2
            2 "promise2"
            setTimeout1-1
            1 "promise1"
            4 "promise4"
            3 "promise3"
            5 "promise5"
            6 "promise6"
        */

        console.log('start')
        setTimeout(() => {
            console.log('setTimeout1')
            setTimeout(() => {
                console.log('setTimeout1-1')
                Promise.resolve(1).then((v) => {
                    console.log(v, 'promise1');
                    return 3
                }).then(v => {
                    console.log(v, 'promise3');
                    return 6
                }).then(v => {
                    console.log(v, 'promise6');
                })
                Promise.resolve(4).then((v) => {
                    console.log(v, 'promise4');
                    return 5
                }).then(v => {
                    console.log(v, 'promise5');
                })
            })
        });
        setTimeout(() => {
            console.log('setTimeout2')
            Promise.resolve(2).then((v) => {
                console.log(v, 'promise2');
            })
        });
        console.log('end')
        /* 

        结果: script start
             async2 end
             Promise
             script end
             async1 end
             promise1
             promise2
             undefined
             setTimeout
        console.log('script start')

        async function async1() {
        await async2()
        console.log('async1 end')
        }
        async function async2() {
        console.log('async2 end') 
        }
        async1()

        setTimeout(function() {
        console.log('setTimeout')
        }, 0)

        new Promise(resolve => {
        console.log('Promise')
        resolve()
        })
        .then(function() {
            console.log('promise1')
        })
        .then(function() {
            console.log('promise2')
        })

        console.log('script end')
        */
    }

    render() {
        return (
            <div className={'event-loop-wrapper'}>
                EventLoop
            </div>
        )
    }
}