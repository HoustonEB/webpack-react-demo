
import React, { Component, useState, useEffect } from 'react';

import { h } from '@src/frontend/global/utils';
import Progress from '@src/frontend/components/Progress';
import './style.use.less';

// 1.函数式组件refs转发
// const Button = React.forwardRef(function (props, ref) {
//     return h.button('', {
//         ref,
//         onClick: props.onClick
//     }, 
//     props.children
//     );
// })
// export default class View extends Component {
//     btnRef;
//     constructor(props) {
//         super(props);
//         this.btnRef = React.createRef();
//     }

//     render() {

//         return (
//             h.div('', {},
//                 h(Button, {ref: this.btnRef}, 'dom转发'),
//                 h(Button, {}, '未dom转发'),
//                 h(Button, {
//                     onClick: () => {console.log(this.btnRef, '子组件btnDom')}
//                 }, '获取子组件dom')
//             )
//         )
//     }
// }

// 2.类组件refs转发
// const Button = React.forwardRef(function (props, ref) {
//     return h.button('', {
//         ref,
//         ...props
//     },
//         props.children
//     );
// })
// const wrapComp = function (component) {
//     class wrapCompView extends React.Component {
//         constructor(props) {
//             super(props);
//         };

//         render() {
//             let { forwardedRef, children, ...rest } = this.props;
//             return h(component, {
//                 ref: forwardedRef,
//                 ...rest
//             }, children);
//         }
//     }
//     return React.forwardRef((props, ref) => {
//         return h(wrapCompView, { forwardedRef: ref, ...props }, props.children);
//     })
// }
// export default class View extends Component {
//     btnRef;
//     wrapBtnComp;

//     constructor(props) {
//         super(props);
//         this.btnRef = React.createRef();
//         this.wrapBtnComp = wrapComp(Button);
//     }

//     render() {

//         return (
//             h.div('', {},
//                 h(this.wrapBtnComp, { ref: this.btnRef }, 'dom转发'),
//                 h(Button, {
//                     onClick: () => { console.log(this.btnRef, '子组件btnDom') }
//                 }, '获取子组件dom')
//             )
//         )
//     }
// }

// hooks
function Count(props) {
    let [count, setCount] = useState(0);
    // useEffect相当于 componentDidMount 和 componentDidUpdate:
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        return function() {
            console.log('组件卸载时清除副作用')
        }
    }, [count]) // 第二个参数[]count变化不执行,仅在组件挂载和卸载时执行,[count]count值变化和前一个count不同就会执行
    return (
        h(React.Fragment, {},
            h.p('', {}, count),
            h.button('', {
                onClick: () => {
                    setCount(count + 1)
                }
            }, '+1')
        )
    )
}
export default class View extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            h.div('', {},
                h(Count, {})
            )
        )
    }
}