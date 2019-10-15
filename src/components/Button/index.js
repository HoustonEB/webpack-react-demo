import React, {Component} from 'react';
import './style.use.less';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={'boxshadow-btn'} onClick={this.props.handleClick} style={this.props.style}>
                <p>{this.props.content}</p>
            </button>
        )
    }
}