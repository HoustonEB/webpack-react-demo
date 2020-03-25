import React, {Component} from 'react';
import {h} from '@src/frontend/global/utils';
import PropTypes from 'prop-types';
import './style.use.less';

export default class Popover extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'Popover-wrapper'}>Popover</div>
        )
    }
}