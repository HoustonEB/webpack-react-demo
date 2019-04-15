import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';

const MenuLink = [
    {
        url: '/css-demo',
        icon: 'pie-chart',
        title: 'Css'
    },
    {
        url: '/card-tree',
        icon: 'pie-chart',
        title: 'CardTree'
    },
    {
        url: '/tree',
        icon: 'pie-chart',
        title: 'Tree'
    },
    {
        url: '/transfer',
        icon: 'pie-chart',
        title: '穿梭框'
    },
    {
        url: '/structure-tree-contrast',
        icon: 'pie-chart',
        title: '结构树对比'
    },
    {
        url: '/js-demo',
        icon: 'pie-chart',
        title: 'JsDemo'
    },
    {
        url: '/draggable',
        icon: 'pie-chart',
        title: 'draggable'
    },
    {
        url: '/reg-exr',
        icon: 'pie-chart',
        title: 'RegExr'
    },
    {
        url: '/canvas',
        icon: 'pie-chart',
        title: 'Canvas'
    },
    {
        url: '/drag-sort',
        icon: 'pie-chart',
        title: '拖拽排序'
    },
    {
        url: '/collapse',
        icon: 'pie-chart',
        title: '折叠面板'
    }
];
const SideRouter = withRouter(
    (history) => {
        let link = MenuLink.map(item => {
            const {url, icon, title} = item;
            return (
                <Menu.Item key={url}>
                    <Icon type={icon}/>
                    <span>{title}</span>
                    <Link to={url}></Link>
                </Menu.Item>
        )
        });
        return (
            <Menu
                mode="inline"
                style={{height: '100%', borderRight: 0}}
                // defaultSelectedKeys={['/css-demo']}
                selectedKeys={[history.location.pathname]}
            >{link}</Menu>
        )
    }
);

export default SideRouter;