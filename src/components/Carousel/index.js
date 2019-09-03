import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.use.less';

export default class Carousel extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        autoPlay: PropTypes.bool,
        effect: PropTypes.oneOf(['fade', 'scrollx']),
        sliderPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
        autoInterval: PropTypes.number
    };

    static defaultProps = {
        autoPlay: true,
        autoInterval: 5000
    };

    _lock = false;
    _startAutoPlay = true;
    _data = this.addOccupyEle(this.props);

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.effect === 'scrollx' ? 1 : 0,
            carouselWidth: 0
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.transitionEnd = this.transitionEnd.bind(this);
    }

    componentDidMount() {
        const {state} = this;
        this.setState((prevState, nextProps) => {
            nextProps.switchFunc && props.switchFunc[prevState.activeIndex]();
            nextProps.autoPlay && this.startAutoPlay();
            return {
                carouselWidth: this.getStyle(this.carouselDom, 'height')
            }
        });
        this.slickTrack.addEventListener('transitionend', this.transitionEnd);
    }

    componentWillUnmount() {
        clearInterval(this.autoInterval);
        this.slickTrack.removeEventListener('transitionend', this.transitionEnd);
    }

    transitionEnd() {
        const {props, state} = this;
        this._lock = false;
        switch (props.effect) {
            case 'scrollx': {
                if (state.activeIndex >= this._data.length - 1) {
                    this.setState({activeIndex: 1});
                    this.slickTrack.style.transition = 'unset';
                } else if (state.activeIndex <= 0) {
                    this.setState({activeIndex: this._data.length - 2});
                    this.slickTrack.style.transition = 'unset';
                }
            }
        }
    }

    addOccupyEle(props) {
        let displayArr = [];
        displayArr = props.data;
        if (props.effect === 'scrollx') {
            let firstEle = props.data[0];
            let lastEle = props.data[props.data.length - 1];
            displayArr.push(firstEle);
            displayArr.unshift(lastEle);
        }
        return displayArr;
    }

    handleSliderClick(index) {
        const {props, state} = this;
        if (index === state.activeIndex) {
            return false;
        }
        this.setState({activeIndex: index});
        props.switchFunc && props.switchFunc[index]();
    }

    componentDidUpdate() {
        this.updateIndex();
    }

    updateFadeIndex(type) {
        const {state} = this;
        if (type === 'prev') {
            if (state.activeIndex < 0) {
                this.setState({activeIndex: this._data.length - 1});
            }
        } else if (type === 'next') {
            if (state.activeIndex > this._data.length - 1) {
                this.setState({activeIndex: 0});
            }
        }
    }

    updateIndex() {
        const {props, state} = this;
        switch (props.effect) {
            case 'scrollx': {
                if (state.activeIndex === 1 && this._startAutoPlay) { // fix初始化从最后一张轮播到第一张的动画
                    this.slickTrack.style.transition = 'unset';
                } else {
                    this.slickTrack.style.transition = 'transform ease-in .5s';
                }
                break;
            }
            case 'fade': {
                this._startAutoPlay && this.updateFadeIndex('next');
                break;
            }
        }
    }

    prev() {
        const {state} = this;
        if(!this._lock) {
            this._lock = true;
            this.setState({activeIndex: --state.activeIndex});
            this.updateFadeIndex('prev');
        }
    }

    next() {
        const {state} = this;
        if (!this._lock) {
            this._lock = true;
            this.setState({activeIndex: ++state.activeIndex});
            this.updateFadeIndex('next');
        }
    }

    startAutoPlay() {
        const {props} = this;
        this.autoInterval = setInterval(() => {
            this._startAutoPlay = true;
            this.setState((prevState, nexProps) => {
                nexProps.switchFunc && nexProps.switchFunc[prevState.activeIndex]();
                return {
                    activeIndex: ++prevState.activeIndex
                }
            });
        }, props.autoInterval);
    }

    closeAutoPlay() {
        clearInterval(this.autoInterval);
        this._startAutoPlay = false;
    }

    handleMouseEnter() {
        this.closeAutoPlay();
    }

    handleMouseLeave() {
        const {props} = this;
        this.closeAutoPlay();
        props.autoPlay && this.startAutoPlay();
    }

    renderSlider() {
        const {props, state} = this;
        const {sliderPosition} = props;
        let sliderArr = [];
        this._data.forEach((item, index) => {
            let className = '';
            switch (props.effect) {
                case 'scrollx':
                    if (state.activeIndex === this._data.length - 1 && index === 1) {
                        className = 'active';
                    } else if (state.activeIndex === 0 && index === this._data.length - 2) {
                        className = 'active';
                    } else if (state.activeIndex === index) {
                        className = 'active';
                    }
                    break;
                case 'fade':
                   if (state.activeIndex === index) {
                        className = 'active';
                    }
                    break;
            }
            sliderArr.push(
                <li
                    key={index}
                    className={`slider ${className}`}
                    onClick={() => this.handleSliderClick(index)}>
                </li>
            );
        });
        if (props.effect === 'scrollx') {
            sliderArr.shift();
            sliderArr.pop();
        }
        return <ul className={`slider-wrapper ${sliderPosition || ''}`}>{sliderArr}</ul>;
    }

    renderArrowLeftBtn() {
        return (
            <div
                className={'left-arrow-btn'}
                onClick={this.prev}>
                <i className={'arrow-left'}></i>
            </div>
        )
    }

    renderArrowRightBtn() {
        return (
            <div
                className={'right-arrow-btn'}
                onClick={this.next}>
                <i className={'arrow-right'}></i>
            </div>
        )
    }

    renderSlickList() {
        const {props, state} = this;
        let slickArr = props.data.map((item, index) => {
            return (
                <div
                    key={index}
                    style={props.effect === 'fade' ? {left: -index * state.carouselWidth} : null}
                    className={`slick-slide-${index} ${props.effect === 'fade' ? state.activeIndex === index ? 'active' : 'inactive' : ''} slick-common`}>
                    {item}
                </div>
            )
        });
        return (
            <div
                style={
                    {
                        width: state.carouselWidth * this._data.length + 'px',
                        transform: props.effect === 'scrollx' ? `translate3d(${-state.activeIndex * state.carouselWidth}px, 0, 0)` : null
                    }
                }
                ref={nodeDom => {
                    this.slickTrack = nodeDom
                }}
                className={'slick-track'}>
                {slickArr}
            </div>
        )
    }

    getStyle(dom, prop) {
        return dom && parseInt(window.getComputedStyle(dom)[prop], 10);
    }

    render() {
        const {props, state} = this;
        return (
            <div
                ref={nodeDome => {
                    this.carouselDom = nodeDome
                }}
                className={`carousel-wrapper ${props.className || ''}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {this.renderArrowLeftBtn()}
                {this.renderArrowRightBtn()}
                {this.renderSlider()}
                {this.renderSlickList()}
            </div>
        );
    }
}
