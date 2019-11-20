/**
 * @file: Anchor View 组件
 * @author: 
 * @date: 
 * @description: Anchor 的 React UI 组件
 */

import React, {Component} from 'react';
import Anchor from '../';
import './style.use.less';
import {promise, loadPromise} from '/src/lessons/promise';

export default class Demo extends Component {
    static demoKey = 'AnchorNormal';
    static demoName = 'Anchor-Normal';

    state = {
        data: [
            {href: '#anchor1', title: '锚点1'},
            {href: '#anchor2', title: '锚点2'},
            {href: '#anchor3', title: '锚点3'},
            {href: '#anchor4', title: '锚点4'},
            {href: '#anchor5', title: '锚点5'},
        ]
    };

    constructor(props) {
        super(props);
        // promise();
        loadPromise();
    }

    renderAnchor() {
        const {
            data
        } = this.state;

        return (
            data.map((item, index) => {
                return (
                    <div key={index} className={'href-box'}>
                        <h3 id={item.href}>{item.title}</h3>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className={'demo-anchor'}>
                <div className={'left'}>{this.renderAnchor()}</div>
                <Anchor className={'right'} data={this.state.data}/>
            </div>
        )
    }
}