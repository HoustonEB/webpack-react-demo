/**
 * @file: Formik View 组件
 * @author: 
 * @date: 
 * @description: Formik 的 React UI 组件
 */

import React, {Component} from 'react';
import Formik from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'FormikNormal';
    static demoName = 'Formik-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Formik/>
        )
    }
}