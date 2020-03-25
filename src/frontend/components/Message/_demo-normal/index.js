/**
 * @file: Message View 组件
 * @author: 
 * @date: 
 * @description: Message 的 React UI 组件
 */

import React, {Component} from 'react';
import Message from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'MessageNormal';
    static demoName = 'Message-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Message/>
        )
    }
}