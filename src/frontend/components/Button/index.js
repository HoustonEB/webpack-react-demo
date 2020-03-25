import React, { Component } from 'react';
import { h, c, isCallable, noop } from '../utils';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './style.use.less';

export const BUTTON_TYPE_LIST = ['default', 'primary', 'normal', 'success', 'danger', 'pale', 'link'];
export const BUTTON_SIZE_LIST = ['default', 'x-small', 'small', 'large'];
export const COMP_TYPE = 'button';

export default class Button extends Component {

    static propTypes = {
        classPrefix: PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.oneOf(BUTTON_TYPE_LIST),
        size: PropTypes.oneOf(BUTTON_SIZE_LIST),
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        onClickDone: PropTypes.func
    };

    static defaultProps = {
        classPrefix: 'once',
        type: 'default',
        size: 'default',
        disabled: false,
        onClick: noop
    };

    state = {
        showLoading: this.props.loading,
        asyncLoading: false
    }

    constructor(props) {
        super(props);
    }

    get compClass() {
        const { classPrefix } = this.props;
        return classPrefix + '-btn';
    }

    get elementType() {
        const { type } = this.props;
        if (type === 'link') {
            return 'a';
        }
        return 'button';
    }

    setAsyncLoading(loading) {
        this.setState({asyncLoading: loading});
    }

    setShowLoading(loading) {
        this.setState({showLoading: loading});
    }

    handleClick = e => {
        const {
            disabled,
            loading,
            onClick,
            onClickDone
        } = this.props;

        if (disabled) {
            return
        }
        const onDone = isCallable(onClickDone) ? onClickDone : noop;
        const {asyncLoading} = this.state;

        if (!disabled && !loading && !asyncLoading && isCallable(onClick)) {
            let ret = onClick(e);
            if (ret && ret.then) {
                this.setShowLoading(true);
                this.setAsyncLoading(true);
                ret.then(res => {
                    this.setShowLoading(false);
                    this.setAsyncLoading(false);
                    onDone(res);
                    return Promise.resolve(res);
                }, error => {
                    this.setShowLoading(false);
                    this.setAsyncLoading(false);
                    return Promise.reject(error);
                })
            } else {
                onDone();
            }
        }
    }

    renderIcon() {
        const {iconType, iconTheme, spin, iconStyle, loading} = this.props;
        const {showLoading} = this.state;
        const iconClass = c(
            `${this.compClass}-icon-font-prefix`
        );
        if (showLoading) {
            return (
                h(Icon, {
                    className: iconClass,
                    type: 'loading', 
                    theme: iconTheme,
                    style: iconStyle,
                    spin
                })
            ) 
        }

        return (
            iconType ? h(Icon, {
                className: iconClass,
                type: iconType, 
                theme: iconTheme,
                style: iconStyle,
                spin
            }) : null
        )
    }

    componentWillReceiveProps(nextProps) {
        const {loading} = nextProps;
        this.setState({showLoading: loading});
    }

    render() {
        const {
            classPrefix,
            className,
            type,
            size,
            disabled,
            children,
            onClick,
            onClickDone,
            title,
            style
        } = this.props;
        const elementType = this.elementType;
        const compClass = this.compClass;

        return (
            h(elementType,
                {
                    className: c(
                        className,
                        `${compClass}-wrapper`,
                        `${compClass}-type-${type}`,
                        `${compClass}-size-${size}`,
                        disabled && `${compClass}-disabled`
                    ),
                    type,
                    style,
                    disabled,
                    onClick: this.handleClick,
                    title
                },
                children ? h.span(`${compClass}-text-wrapper`, {} ,
                this.renderIcon(),
                 h.span('', {}, children)) : null
            )
        )
    }
}