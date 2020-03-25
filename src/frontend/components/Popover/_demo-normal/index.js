/**
 * @file: Popover View 组件
 * @author: 
 * @date: 
 * @description: Popover 的 React UI 组件
 */

import React, {Component} from 'react';
import Popover from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'PopoverNormal';
    static demoName = 'Popover-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Popover/>
        )
    }
}