import React, {Component} from 'react';
import {HashRouter, BrowserRouter, Route, Redirect, Link} from "react-router-dom";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import SideRouter from './router';
import './style.main.less';
import CssDemo from "./CssDemo";
import CardTree from "./CardTree";
import Tree from "./Tree";
import Transfer from "./Transfer";
import StructureTreeContrast from "./StructureTreeContrast";
import JsDemo from "./JsDemo";
import Draggable from './Draggable';
import RegExr from './RegExr';
import Canvas from './Canvas';
import DragSort from './DragSort';
import Carousel from './Carousel';
import Collapse from './Collapse';
import VirtualList from './VirtualList';

const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;
// const routeConfig = [
//     { path: '/',
//         component: App,
//         indexRoute: { component: CssDemo },
//         childRoutes: [
//             { path: 'about', component: About },
//             { path: 'inbox',
//                 component: Inbox,
//                 childRoutes: [
//                     { path: '/messages/:id', component: Message },
//                     { path: 'messages/:id',
//                         onEnter: function (nextState, replaceState) {
//                             replaceState(null, '/messages/' + nextState.params.id)
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// ];

const routeConfig = [
    { path: '/',
        component: CssDemo,
        indexRoute: { component: CssDemo },
        childRoutes: [
            { path: '/css-demo', component: CssDemo },
            { path: '/card-tree', component: CardTree },
            { path: '/tree', component: new Tree().defaultComp },
            { path: '/transfer', component: new Transfer().defaultComp },
            { path: '/structure-tree-contrast', component: new StructureTreeContrast().defaultComp },
            { path: '/js-demo', component: new JsDemo().defaultComp },
            { path: '/draggable', component: new Draggable().defaultComp },
            { path: '/reg-exr', component: new RegExr().defaultComp },
            { path: '/canvas', component: new Canvas().defaultComp},
            { path: '/drag-sort', component: new DragSort().defaultComp},
            { path: '/collapse', component: Collapse}
        ]
    }
];

export default class App extends Component {

    renderHeader() {
        return (
            <Header className="header">
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        )
    }

    renderSider() {
        return (
            <Sider width={200} style={{background: '#fff'}}>
                <SideRouter />
            </Sider>
        )
    }

    renderContent() {
        return (
            <Layout style={{padding: '24px', height: '90vh'}}>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 350}}>
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
                </Content>
            </Layout>
        )
    }

    renderContainer() {
        return (
            <Layout>
                {/*{this.renderHeader()}*/}
                    {this.renderSider()}
                    {this.renderContent()}
            </Layout>
        )
    }

    render() {
        console.log(process.env.NODE_ENV, '当前环境')
        return (
            <div>
                {/*react-router 4.0.0 version router删除用hashRouter替代 => 解决原地刷新页面报错(get不到页面)*/}
                <HashRouter routes={routeConfig}>
                    {this.renderContainer()}
                </HashRouter>
            </div>
        )
    }
}
