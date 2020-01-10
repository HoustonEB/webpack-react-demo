import React, {Component} from 'react';
import {h} from '/src/global/utils';
import PropTypes from 'prop-types';
import './style.use.less';

export default class {{compName}} extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'{{compName}}-wrapper'}>{{compName}}</div>
        )
    }
}