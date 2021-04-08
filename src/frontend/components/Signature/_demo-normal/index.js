/**
 * @file: Signature View 组件
 * @author: 
 * @date: 
 * @description: Signature 的 React UI 组件
 */

import React, {Component} from 'react';
import Signature from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'SignatureNormal';
    static demoName = 'Signature-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Signature/>
        )
    }
}