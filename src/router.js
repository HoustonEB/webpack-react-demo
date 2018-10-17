import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import CssDemo from './CssDemo';
import ExcelDemo from './ExcelDemo';

const {SubMenu} = Menu;

const sideRouter = () => (
    <Menu
        mode="inline"
        style={{height: '100%', borderRight: 0}}
        defaultSelectedKeys={['1']}
    >
        <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Css</span>
            <Link to="/css-demo"></Link>
        </Menu.Item>
        <Menu.Item key="5">
            <Icon type="pie-chart" />
            <span>Excel</span>
            <Link to="/ExcelDemo"></Link>
        </Menu.Item>
        <Menu.Item key="9">option9</Menu.Item>
    </Menu>
);

const contentRoute = () => (
    <Route exact path="/css-demo" component={CssDemo}/>
);

export default sideRouter;
export {contentRoute};