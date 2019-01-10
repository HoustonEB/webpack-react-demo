import React, {Component} from 'react';
import {HashRouter, Route, Redirect, Link} from "react-router-dom";
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

const {Header, Content, Sider} = Layout;

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
                </Content>
            </Layout>
        )
    }

    renderContainer() {
        return (
            <Layout>
                {/*{this.renderHeader()}*/}
                <Layout>
                    {this.renderSider()}
                    {this.renderContent()}
                </Layout>
            </Layout>
        )
    }

    render() {
        return (
            <div>
                {/*react-router 4.0.0 version router删除用hashRouter替代 => 解决原地刷新页面报错(get不到页面)*/}
                <HashRouter>
                    {this.renderContainer()}
                </HashRouter>
            </div>
        )
    }
}
