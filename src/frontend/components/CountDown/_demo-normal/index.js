/**
 * @file: CountDown View 组件
 * @author: 
 * @date: 
 * @description: CountDown 的 React UI 组件
 */

import React, {Component} from 'react';
import CountDown from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'CountDownNormal';
    static demoName = 'CountDown-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CountDown/>
        )
    }
}