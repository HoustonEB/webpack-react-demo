/**
 * @file: Breadcrumb View 组件
 * @author:
 * @date:
 * @description: Breadcrumb 的 React UI 组件
 */

import React, {Component} from 'react';
import Breadcrumb from '/src/components/Breadcrumb';
import Button from '/src/components/Button';
import {Link, Route, Switch} from "react-router-dom";
import './style.use.less';

export default class BreadcrumbDemo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
    }

    // Switch补充匹配路由
    render() {
        return (
            <div className={'breadcrumb-demo-box'}>
                <Breadcrumb route={this.props.location}/>
                <Link to={`/Breadcrumb/comp1`}>comp1</Link>
                <Link to={`/Breadcrumb/comp2`}>comp2</Link>
                <Switch>
                    <Route path="/Breadcrumb/comp1" render={() => {
                        return (
                            <div>
                                <Link to={'/Breadcrumb/comp1/1-1'}>1-1</Link>
                                <h1>comp1</h1>
                                <Route path={'/Breadcrumb/comp1/1-1'}>1-1content</Route>
                            </div>
                            )
                    }}/>
                    <Route path="/Breadcrumb/comp2" render={() => {
                        return (
                            <div>
                                <Link to={'/Breadcrumb/comp2/2-2'}>2-2</Link>
                                <h1>comp2</h1>
                                <Route path={'/Breadcrumb/comp2/2-2'}>2-2content</Route>
                            </div>
                        )
                    }}/>
                </Switch>
            </div>
        )
    }
}