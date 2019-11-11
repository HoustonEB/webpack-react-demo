/**
 * @file: {{compName}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compName}} 的 React UI 组件
 */

import React, {Component} from 'react';
import {{compName}} from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = '{{compName}}Normal';
    static demoName = '{{compName}}-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <{{compName}}/>
        )
    }
}