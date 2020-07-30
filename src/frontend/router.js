import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';

const SideRouter = withRouter(
    (history) => {
        const router = [
            {
                key: '/css-demo',
                sideBarName: 'Css',
                url: '/css-demo'
            },
            {
                key: '/card-tree',
                sideBarName: 'CardTree',
                url: '/card-tree'
            },
            {
                key: '/tree',
                sideBarName: 'Tree',
                url: '/tree'
            },
            {
                key: '/transfer',
                sideBarName: '穿梭框',
                url: '/transfer'
            },
            {
                key: '/structure-tree-contrast',
                sideBarName: '结构树对比',
                url: '/structure-tree-contrast'
            },
            {
                key: '/js-demo',
                sideBarName: 'JsDemo',
                url: '/js-demo'
            },
            {
                key: '/draggable',
                sideBarName: 'draggable',
                url: '/draggable'
            },
            {
                key: '/reg-exr',
                sideBarName: 'RegExr',
                url: '/reg-exr'
            },
            {
                key: '/canvas',
                sideBarName: 'Canvas',
                url: '/canvas'
            },
            {
                key: '/drag-sort',
                sideBarName: '拖拽排序',
                url: '/drag-sort'
            },
            {
                key: '/carousel',
                sideBarName: '轮播图',
                url: '/carousel'
            },
        ]
        return (
            <Menu
                mode="inline"
                style={{height: '100%', borderRight: 0}}
                // defaultSelectedKeys={['/css-demo']}
                selectedKeys={[history.location.pathname]}
            >
                {router.map(item => {
                    const {key, sideBarName, url} = item;
                    return (
                        <Menu.Item key={key}>
                            <span>{sideBarName}</span>
                            <Link to={url}></Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        )
    }
);

export default SideRouter;