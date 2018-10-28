import React from 'react';
import {Route, Link} from "react-router-dom";
import {Menu, Icon} from 'antd';

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
        <Menu.Item key="2">
            <Icon type="pie-chart" />
            <span>Excel</span>
            <Link to="/excel-demo"></Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="pie-chart" />
            <span>Tree</span>
            <Link to="/tree"></Link>
        </Menu.Item>
    </Menu>
);

export default sideRouter;