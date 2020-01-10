import React, {Component} from 'react';
import {HashRouter, Switch, BrowserRouter, Route, Redirect, Link, withRouter, Router} from "react-router-dom";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import routeConfig from './router';
import './style.main.less';

const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;

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
    {
        key: '/mobx',
        url: '/mobx',
        sideBarName: 'mobx'
    },
    {
        key: '/d3',
        url: '/d3',
        sideBarName: 'D3'
    },
    {
        key: '/breadcrumb',
        url: '/breadcrumb',
        sideBarName: 'Breadcrumb'
    },
    {
        key: '/auto-save',
        url: '/auto-save',
        sideBarName: 'AutoSave'
    },
    {
        key: '/select',
        url: '/select',
        sideBarName: 'Select'
    },
    {
        key: '/calendar',
        url: '/calendar',
        sideBarName: 'Calendar'
    },
    {
        key: '/message',
        url: '/message',
        sideBarName: 'Message'
    },
    {
        key: '/button',
        url: '/button',
        sideBarName: 'Button'
    }
];

const SideRouter = withRouter(
    (history) => {
        let link = MenuLink.map(item => {
            const {url, key, sideBarName} = item;
            return (
                <Menu.Item key={key} style={{width: '100%'}}>
                    <span>{sideBarName}</span>
                    <Link to={url}></Link>
                </Menu.Item>
            )
        });
        return (
            <Menu
                mode="inline"
                style={{borderRight: 'none'}}
                defaultSelectedKeys={['/css-demo']}
                selectedKeys={[history.location.pathname]}
            >{link}</Menu>
        )
    }
);

const RouteWithSubRoutes = (route) => {
    console.log(route, 'route');
    // 父路由加exact=true,不能匹配子路由.
    return (
        <Route
            path={route.path}
            // exact={route.exact || true}
            render={props => {
                console.log(props, 'props')
                // pass the sub-routes down to keep nesting
                return <route.component {...props} routes={route.routes} />
            }}
            // component={route.component}
        />
    );
};

export default class App extends Component {

    renderSider() {
        return (
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                backgroundColor: '#fff',
                borderRight: '1px solid #eee'}}>
                <SideRouter />
            </Sider>
        )
    }

    renderContent() {
        return (
            <Layout style={{height: '100vh'}}>
                <Content style={{background: '#fff', padding: 24, marginLeft: 200, minHeight: 350}}>
                    <Switch>
                    {routeConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                    </Switch>
                </Content>
            </Layout>
        )
    }

    renderContainer() {
        return (
            <Layout>
                {this.renderSider()}
                {this.renderContent()}
            </Layout>
        )
    }

    render() {
        console.log(process.env.NODE_ENV, '当前环境')
        return (
            <HashRouter>
                {/*react-router 4.0.0 version router删除用hashRouter替代 => 解决原地刷新页面报错(get不到页面)*/}
                {this.renderContainer()}
            </HashRouter>
        )
    }
}
