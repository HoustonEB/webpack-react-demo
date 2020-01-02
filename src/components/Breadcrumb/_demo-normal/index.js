/**
 * @file: Breadcrumb View 组件
 * @author:
 * @date:
 * @description: Breadcrumb 的 React UI 组件
 */

import React, {Component} from 'react';
import Breadcrumb from '../';
import Button from '../../Button';
import {HashRouter, BrowserRouter, Route, Redirect, Link, Router} from "react-router-dom";
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'BreadcrumbNormal';
    static demoName = 'Breadcrumb-Normal';

    state = {
        route: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Breadcrumb route={this.props.location}/>
                <HashRouter>
                    <Link to={`/comp1`}>comp1</Link>
                    <Route exact path={`/comp1`} component={Button}/>
                </HashRouter>
            </div>
        )
    }
}

function comp1() {
    return (
        <h1>comp1</h1>
    )
}

function comp2() {
    return (
        <h2>comp2</h2>
    )
}