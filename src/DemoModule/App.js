import React, {Component} from 'react';
import {Menu, Layout} from 'antd';
import {HashRouter, BrowserRouter, Route, Redirect, Link, Router} from "react-router-dom";

// const {compsPrefix} = require('../components/locale');
const Content = Layout.Content;
const Sider = Layout.Sider;

function renderRouter() {
    let context = require.context('../../src/components', true, /\/_demo-normal\/index\.js$/);
    let routes = {};
    routes.components = context.keys().map(context);
    return routes;
}

export default class App extends Component {

    routes = renderRouter();

    renderLink() {
            return (
                <Sider style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    backgroundColor: '#fff',
                    borderRight: '1px solid #eee'}}>
                    <Menu
                        onClick={this.handleClick}
                        style={{width: 256}}
                        defaultSelectedKeys={[0]}
                        mode="inline"
                    >
                        {
                            this.routes.components.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        <Link to={`/${item.default.demoKey}`}>{item.default.demoName}</Link>
                                    </Menu.Item>
                                )
                            })

                        }
                    </Menu>
                </Sider>
            )
    }

    renderContent() {
        return (
            <Layout style={{height: '100vh'}}>
                <Content style={{background: '#fff', padding: 24, marginLeft: 200, minHeight: 350}}>
                    {
                        this.routes.components.map((item, index) => {
                            return (
                                <Route key={index} exact path={`/${item.default.demoKey || 1}`} component={item.default}/>
                            )
                        })
                    }
                </Content>
            </Layout>
        )
    }

    render() {
        return (
            <div>
                <HashRouter>
                    {this.renderLink()}
                    {this.renderContent()}
                </HashRouter>
            </div>
        )
    }
}