/**
 * @file: Croppie View 组件
 * @author: 
 * @date: 
 * @description: Croppie 的 React UI 组件
 */

import React, {Component} from 'react';
import Croppie from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'CroppieNormal';
    static demoName = 'Croppie-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Croppie/>
        )
    }
}