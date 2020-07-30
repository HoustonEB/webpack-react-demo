/**
 * @file: Select View 组件
 * @author: 
 * @date: 
 * @description: Select 的 React UI 组件
 */

import React, {Component} from 'react';
import Select from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'SelectNormal';
    static demoName = 'Select-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Select/>
        )
    }
}