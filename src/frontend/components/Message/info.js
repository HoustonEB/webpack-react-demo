import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {callIfCallable} from '../utils';
import './style.use.less';

export default class Message extends Component {

    static propTypes = {
        classPrefix: PropTypes.string,
        className: PropTypes.string,
        
    };

    static defaultProps = {
        classPrefix: 'once',
        className: ''
    };
    timer

    constructor(props) {
        super(props);
    }

    // closeTimer = buffer(() => {
    //     // if (this.timer) {
    //     //     clearTimeout(this.timer);
    //     //     this.timer = null;
    //     // }
    //     this.close();
    //     // this.timer = setTimeout(() => {
    //     //     this.close();
    //     // }, this.props.duration)
    // }, this.props.duration)

    closeTimer() {
        this.timer = setTimeout(() => {
            this.close()
        }, this.props.duration)
    }

    close = () => {
        callIfCallable(this.props.onClose);
    }

    componentDidMount() {
        this.closeTimer();
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        const {
            classPrefix,
            className,
            content,
            children
        } = this.props;
        return (
            <div className={`${classPrefix}-message-content-wrapper ${className}`}>
                {children}
            </div>
        )
    }
}

