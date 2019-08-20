import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';

const MenuLink = [
    {
        key: '/css-demo',
        url: '/css-demo',
        sideBarName: 'Css'
    },
    {
        key: '/card-tree',
        url: '/card-tree',
        sideBarName: 'CardTree'
    },
    {
        key: '/tree',
        url: '/tree',
        sideBarName: 'Tree'
    },
    {
        key: '/transfer',
        url: '/transfer',
        sideBarName: '穿梭框'
    },
    {
        key: '/structure-tree-contrast',
        url: '/structure-tree-contrast',
        sideBarName: '结构树对比'
    },
    {
        key: '/js-demo',
        url: '/js-demo',
        sideBarName: 'JsDemo'
    },
    {
        key: '/draggable',
        url: '/draggable',
        sideBarName: 'draggable'
    },
    {
        key: '/reg-exr',
        url: '/reg-exr',
        sideBarName: 'RegExr'
    },
    {
        key: '/canvas',
        url: '/canvas',
        sideBarName: 'Canvas'
    },
    {
        key: '/drag-sort',
        url: '/drag-sort',
        sideBarName: '拖拽排序'
    },
    {
        key: '/collapse',
        url: '/collapse',
        sideBarName: '折叠面板'
    },
    {
        key: '/carousel',
        url: '/carousel',
        sideBarName: '轮播图'
    },
    {
        key: '/virtual-list',
        url: '/virtual-list',
        sideBarName: '虚拟列表'
    },
];
const SideRouter = withRouter(
    (history) => {
        let link = MenuLink.map(item => {
            const {url, key, sideBarName} = item;
            return (
                <Menu.Item key={key}>
                    <span>{sideBarName}</span>
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