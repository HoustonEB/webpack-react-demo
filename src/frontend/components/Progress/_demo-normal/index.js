/**
 * @file: Progress View 组件
 * @author: 
 * @date: 
 * @description: Progress 的 React UI 组件
 */

import React, {Component} from 'react';
import Progress from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'ProgressNormal';
    static demoName = 'Progress-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Progress/>
        )
    }
}