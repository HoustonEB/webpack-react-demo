import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.use.less';

export default class Croppie extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'Croppie-wrapper'}>Croppie</div>
        )
    }
}