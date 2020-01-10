import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.use.less';

export function buffer(fn, ms) {
    let timer

    function clear() {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    function bufferFn() {
        clear()
        timer = setTimeout(fn, ms)
    }

    function getId() {
        return timer
    }

    bufferFn.clear = clear
    bufferFn.getId = getId

    return bufferFn
}
export default class Message extends Component {

    static propTypes = {
        prefixClass: PropTypes.string,
        className: PropTypes.string,
        
    };

    static defaultProps = {
        prefixClass: 'once',
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
        this.props.onClose();
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
            prefixClass,
            className,
            content,
            children
        } = this.props;
        return (
            <div className={`${prefixClass}-message-content-wrapper ${className}`}>
                {children}
            </div>
        )
    }
}

