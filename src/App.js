import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import sideRouter, {contentRoute} from './router';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import './style.main.less';
import CssDemo from "./CssDemo";
import ExcelDemo from "./ExcelDemo";

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
            <Layout style={{padding: '0 24px 24px', height: '90vh'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                    <Route path="/css-demo" component={CssDemo}/>
                    <Route exact path="/excel-demo" component={ExcelDemo}/>
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
                <Router>
                    {this.renderContainer()}
                </Router>
            </div>
        )
    }
}
