import React, {Component} from 'react';
import CircleProgressBar from '../';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class Demo extends Component {
    static demoKey = 'CircleProgressBarNormal';
    static demoName = 'CircleProgressBar-Normal';
    @observable progressNum = 0;
    constructor(props) {
        super(props);
    }

    handleChangeNum() {
        let percent = document.getElementsByClassName('percent-num')[0];
        this.progressNum = percent.value;
    }

    render() {
        return (
            <div>
                <input
                    className={'percent-num'}
                    type='range'
                    value={this.progressNum}
                    min='0'
                    max='100'
                    step='1'
                    onChange={() => this.handleChangeNum()}></input>
                <CircleProgressBar progressNum={this.progressNum}/>
            </div>
        )
    }
}