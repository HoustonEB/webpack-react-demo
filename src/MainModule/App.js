import React, {Component} from 'react';
import {HashRouter, BrowserRouter, Route, Redirect, Link, withRouter, Router} from "react-router-dom";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import routeConfig from './router';
import './style.main.less';
import CssDemo from "./CssDemo";
import StructureTreeContrast from "./StructureTreeContrast";
import CardTree from "./CardTree";
import Tree from "./Tree";
import DragSort from "./DragSort";
import Canvas from "./Canvas";
import Draggable from "./Draggable";
import Collapse from "./Collapse";
import JsDemo from "./JsDemo";
import RegExr from "./RegExr";
import Transfer from "./Transfer";
import Carousel from "./Carousel";
import VirtualList from "./VirtualList";
import mobx from "./mobxExample";
import d3 from './d3-bar';
import BreadcrumbDemo from './Breadcrumb';

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
        key: '/Breadcrumb',
        url: '/Breadcrumb',
        sideBarName: 'Breadcrumb'
    },
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
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
    // return (
    //     <Route
    //         path={route.path}
    //         render={props => (
    //             // pass the sub-routes down to keep nesting
    //             <route.component {...props} routes={route.routes} />
    //         )}
    //     />
    // );
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
                    {/*{routeConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}*/}
                    <Route exact path="/" render={() => (<Redirect to="/css-demo"/>)}/> {/*首次进入跳转到指定由*/}
                    <Route exact path="/css-demo" component={CssDemo}/>
                    <Route exact path="/card-tree" component={CardTree}/>
                    <Route exact path="/tree" component={new Tree().defaultComp}/>
                    <Route exact path="/transfer" component={new Transfer().defaultComp}/>
                    <Route exact path="/structure-tree-contrast" component={new StructureTreeContrast().defaultComp}/>
                    <Route exact path="/js-demo" component={new JsDemo().defaultComp}/>
                    <Route exact path="/draggable" component={new Draggable().defaultComp}/>
                    <Route exact path="/reg-exr" component={new RegExr().defaultComp}/>
                    <Route exact path="/canvas" component={new Canvas().defaultComp}/>
                    <Route exact path="/drag-sort" component={new DragSort().defaultComp}/>
                    <Route exact path="/carousel" component={Carousel}/>
                    <Route exact path="/collapse" component={Collapse}/>
                    <Route exact path="/virtual-list" component={VirtualList}/>
                    <Route exact path="/mobx" component={mobx}/>
                    <Route exact path="/d3" component={d3}/>
                    <Route path="/Breadcrumb" component={BreadcrumbDemo}/>
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
