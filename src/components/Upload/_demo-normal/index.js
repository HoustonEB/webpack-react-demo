/**
 * @file: Upload View 组件
 * @author: 
 * @date: 
 * @description: Upload 的 React UI 组件
 */

import React, {Component} from 'react';
import Upload from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'UploadNormal';
    static demoName = 'Upload-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Upload/>
        )
    }
}