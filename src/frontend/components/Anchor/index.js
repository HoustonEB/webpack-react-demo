import React, {Component} from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import {throttle} from '@src/frontend/global/utils';
import './style.use.less';

export default class Anchor extends Component {
    static propTypes = {
        data: PropTypes.array,
        classPrefix: PropTypes.string
    };

    static defaultProps = {
        classPrefix: 'once'
    };

    state = {
        activeIndex: 0
    };

    anchorHeight;
    circleHeight;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.anchorHeight = this.anchor0.offsetHeight;
        this.circleHeight = this.circle.offsetHeight;
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
        // TODO: 滚动时间差问题
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200)

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    renderAnchor() {
        const {
            data
        } = this.props;
        const {
            activeIndex
        } = this.state;

        return (
            data.map((item, index) => {
                return (
                    <div
                        key={index}
                        ref={domNode => this['anchor' + index] = domNode}>
                        <a
                            href={item.href}
                            title={item.title}
                            className={activeIndex === index ? 'active' : ''}
                            onClick={this.handleJumpClick.bind(this, item.href, index)}>{item.title}</a>
                    </div>
                )
            })
        )
    }

    handleJumpClick(id, index, e) {
        e.preventDefault();
        let anchorEl = document.getElementById(id);
        this.setState({activeIndex: index});
        anchorEl.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    }

    handleScroll = throttle(() => {
        const {
            data
        } = this.props;

        data.forEach((item, index) => {
            let target = document.getElementById(item.href);
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= target.offsetTop) {
                this.setState({activeIndex: index});
            }
            if (scrollTop <= document.getElementById(data[0].href).offsetTop) {
                this.setState({activeIndex: 0});
            }
        });
    }, 200, 200);

    render() {
        const {
            classPrefix,
            className
        } = this.props;

        return (
            <div className={c(`${classPrefix}-anchor-wrapper`, className)}>
                <div className={'circle-box'}>
                    <span
                        ref={domNode => this.circle = domNode}
                        className={'circle'}
                        style={
                            {
                                top: `${this.circleTop}px`
                            }
                        }></span>
                </div>
                {this.renderAnchor()}
            </div>
        )
    }

    get circleTop() {
        const {
            activeIndex
        } = this.state;

        return ((this.anchorHeight * activeIndex) + this.anchorHeight / 2) - (this.circleHeight / 2);
    }
}