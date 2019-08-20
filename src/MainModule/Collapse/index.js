import React, {Component} from 'react';
import Collapse from '../../components/Collapse';

export default class View extends Component {
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