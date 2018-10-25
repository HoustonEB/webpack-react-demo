import React, {Component} from 'react';
import './style.use.less';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        let $button = document.querySelector('.jelly-btn');
    }

    render() {
        return (
            <button className={'boxshadow-btn'} onClick={this.props.handleClick}>
                <p>{this.props.content}</p>
            </button>
        )
    }
}