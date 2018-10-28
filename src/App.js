import React, {Component} from 'react';
import {HashRouter, Route, Link} from "react-router-dom";
import sideRouter, {contentRoute} from './router';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import './style.main.less';
import CssDemo from "./CssDemo";
import ExcelDemo from "./ExcelDemo";
import Tree from "./Tree";

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
                {sideRouter()}
            </Sider>
        )
    }

    renderContent() {
        return (
            <Layout style={{padding: '24px', height: '90vh'}}>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 350}}>
                    <Route path="/css-demo" component={CssDemo}/>
                    <Route exact path="/excel-demo" component={ExcelDemo}/>
                    <Route exact path="/tree" component={new Tree().defaultComp}/>
                </Content>
            </Layout>
        )
    }

    renderContainer() {
        return (
            <Layout>
                {this.renderHeader()}
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
