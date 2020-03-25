/**
 * @file: lazyLoadImg View 组件
 * @author: 
 * @date: 
 * @description: lazyLoadImg 的 React UI 组件
 */

import React, {Component} from 'react';
import LazyLoadImg from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'LazyLoadImgNormal';
    static demoName = 'LazyLoadImg-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LazyLoadImg/>
        )
    }
}