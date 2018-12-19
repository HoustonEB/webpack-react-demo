import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';

const SideRouter = withRouter(
    (history) => {
        console.log(history, 'history')
        return (
            <Menu
                mode="inline"
                style={{height: '100%', borderRight: 0}}
                // defaultSelectedKeys={['/css-demo']}
                selectedKeys={[history.location.pathname]}
            >
                <Menu.Item key="/css-demo">
                    <Icon type="pie-chart" />
                    <span>Css</span>
                    <Link to="/css-demo"></Link>
                </Menu.Item>
                <Menu.Item key="/excel-demo">
                    <Icon type="pie-chart" />
                    <span>Excel</span>
                    <Link to="/excel-demo"></Link>
                </Menu.Item>
                <Menu.Item key="/tree">
                    <Icon type="pie-chart" />
                    <span>Tree</span>
                    <Link to="/tree"></Link>
                </Menu.Item>
                <Menu.Item key="/transfer">
                    <Icon type="pie-chart" />
                    <span>穿梭框</span>
                    <Link to="/transfer"></Link>
                </Menu.Item>
                <Menu.Item key="/structure-tree-contrast">
                    <Icon type="pie-chart" />
                    <span>结构树对比</span>
                    <Link to="/structure-tree-contrast"></Link>
                </Menu.Item>
                <Menu.Item key="/js-demo">
                    <Icon type="pie-chart" />
                    <span>JsDemo</span>
                    <Link to="/js-demo"></Link>
                </Menu.Item>
                <Menu.Item key="/draggable">
                    <Icon type="pie-chart" />
                    <span>draggable</span>
                    <Link to="/draggable"></Link>
                </Menu.Item>
                <Menu.Item key="/reg-exr">
                    <Icon type="pie-chart" />
                    <span>RegExr</span>
                    <Link to="/reg-exr"></Link>
                </Menu.Item>
            </Menu>
        )
    }
);

export default SideRouter;