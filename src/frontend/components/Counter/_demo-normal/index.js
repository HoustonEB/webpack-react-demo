import React, {Component} from 'react';
import Counter from '../';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class Demo extends Component {
    static demoKey = 'CounterNormal';
    static demoName = 'Counter-Normal';
    @observable counterNum = 0;
    constructor(props) {
        super(props);
    }

    hadnleCounterChange(value) {
        this.counterNum = value;
    }

    render() {
        return (
            <div>
                <Counter counterNum={this.counterNum} onChange={(value) => this.hadnleCounterChange(value)}/>
            </div>
        )
    }
}