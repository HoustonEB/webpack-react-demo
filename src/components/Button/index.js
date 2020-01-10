import React, {Component} from 'react';
import {h} from '../utils';
import PropTypes from 'prop-types';
import './style.use.less';

export default class Button extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'button-wrapper'}></div>
        )
    }
}