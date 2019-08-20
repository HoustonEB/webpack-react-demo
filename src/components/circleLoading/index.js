import React, {Component} from 'react';
import './style.use.less';

export default class CircleLoading extends Component {

    constructor(props) {
        super(props)
    }

    renderCircle() {
        let dom = <div className={'circle-loading'}>
            <div className={'left-circle-wrapper'}>
                <div className="left-circle"></div>
            </div>
            <div className="process-num"></div>
            <div className={'right-circle-wrapper'}>
                <div className="right-circle"></div>
            </div>
        </div>
        return (
            dom
        )
    }

    render() {
        return (
            <div className={'circle-loading-wrapper'}>
                {this.renderCircle()}
            </div>
        )
    }
}