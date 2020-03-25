import React, { Component } from 'react';
import { h, c, isCallable, noop } from '../utils';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.use.less';

export default class Progress extends Component {

    static propTypes = {
        prefixClass: PropTypes.string,
        className: PropTypes.string,
        strokeWidth: PropTypes.number,
        strokeLineCap: PropTypes.oneOf(['round', 'square']),
        type: PropTypes.oneOf(['line', 'circle']),
        status: PropTypes.oneOf(['success', 'exception', 'normal']),
        size: PropTypes.oneOf(['small', 'medium']),
        percent: PropTypes.number,
        width: PropTypes.number,
        showInfo: PropTypes.bool
    };

    static defaultProps = {
        className: '',
        prefixClass: 'once',
        type: 'line',
        strokeLineCap: 'round',
        status: 'normal',
        showInfo: true
    };

    constructor(props) {
        super(props);
    }

    renderInfo() {
        const { percent, status } = this.props;
        switch (status) {
            case 'normal':
                return percent === 100 ? h(Icon, {
                    type: 'check-circle',
                    style: { color: '#52c41a' }
                }
                ) : h.span('percent-text', {}, percent + '%');
                break;
            case 'success':
                return h(Icon, {
                    type: 'check-circle',
                    style: { color: '#52c41a' }
                }
                );
                break;
            case 'exception':
                return h(Icon, {
                    type: 'close-circle',
                    style: { color: '#f5222d' }
                }
                );
                break;

        }
    }

    render() {
        const {
            prefixClass,
            className,
            strokeWidth,
            strokeLineCap,
            percent,
            width,
            size,
            status,
            showInfo
        } = this.props;
        const borderRadius = strokeLineCap === 'square' ? '0' : strokeWidth ? strokeWidth + 'px' : null;
        const outerStyle = {
            width
        };
        const innerStyle = {
            width: '100%',
            borderRadius
        }
        const bgStyle = {
            width: `${percent}%`,
            height: strokeWidth ? strokeWidth + 'px' : null,
            backgroundColor: percent === 100 ? '#52c41a' : null,
            borderRadius
        }
        return (
            h.div(c([
                `${prefixClass}-progress-wrapper`,
                `${className}`,
                `${prefixClass}-progress-size-${size}`,
                { 'show-info': showInfo }
            ]), { style: outerStyle },
                h.div(`${prefixClass}-progress-outer`, {},
                    h.div(`${prefixClass}-progress-inner`, { style: innerStyle },
                        h.div(c([
                            `${prefixClass}-progress-bg`,
                            `${prefixClass}-progress-status-${status}`
                        ]), { style: bgStyle })
                    )
                ),
                showInfo ? h.span(`${prefixClass}-progress-inner-text`, {},
                    this.renderInfo()
                ) : null
            )
        )
    }
}