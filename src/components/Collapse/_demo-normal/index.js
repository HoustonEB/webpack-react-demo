import React, {Component} from 'react';
import Collapse from '../';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class Demo extends Component {
    static demoKey = 'CollapseNormal';
    static demoName = 'Collapse-Normal';

    collapseData = Array(10000).fill({title: 'test', key: 'null'});

    constructor(props) {
        super(props);
        this.state = {
            collapseMode: true
        }
    }
    handleSwitchMode() {
        this.setState({
            collapseMode: !this.state.collapseMode
        })
    }

    render () {
        return (
            <div>
                <button onClick={this.handleSwitchMode.bind(this)}>{this.state.collapseMode ? '折叠面板' : '手风琴'}</button>
                <Collapse collapseData={this.collapseData} collapseMode={this.state.collapseMode} />
            </div>
        )
    }
}