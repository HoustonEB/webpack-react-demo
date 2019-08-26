import React, {Component} from 'react';
import {throttle} from 'lodash';
import './style.use.less';

export default class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            data: []
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        this.props.switchFunc && this.props.switchFunc[this.state.activeIndex]();
        this.startAutoPlay();
    }

    componentWillUnmount() {
        clearInterval(this.autoInterval);
    }

    handleSliderClick(index) {
        if (index === this.state.activeIndex) {
            return false;
        }
        this.setState({
            activeIndex: index
        });
        this.props.switchFunc && this.props.switchFunc[index]();
    }

    renderSlider() {
        const {props} = this;
        const {sliderPosition} = props;
        let sliderArr = [];
        props.data.forEach((item, index) => {
            sliderArr.push(
                <li
                    key={index}
                    className={`slider ${this.state.activeIndex === index ? 'active' : ''}`}
                    onClick={() => this.handleSliderClick(index)}>
                </li>
            );
        });
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

    prev = throttle(() => {
        const {props} = this;
        if (this.state.activeIndex === 0) {
            this.setState({
                activeIndex: props.data.length - 1
            });
        } else {
            this.setState({
                activeIndex: --this.state.activeIndex
            });
        }
    }, 500);

    next = throttle(() => {
        const {props} = this;
        if (this.state.activeIndex === (props.data.length - 1)) {
            this.setState({
                activeIndex: 0
            });
        } else {
            this.setState({
                activeIndex: ++this.state.activeIndex
            });
        }
    }, 500);

    startAutoPlay() {
        let currentActive = 0;
        this.autoInterval = setInterval(() => {
            currentActive++;
            if (this.state.activeIndex >= this.props.data.length - 1) {
                currentActive = 0;
            }

            this.setState({
                activeIndex: currentActive
            });
            this.props.switchFunc && this.props.switchFunc[this.state.activeIndex]();
        }, 5000);
    }

    closeAutoPlay() {
        clearInterval(this.autoInterval);
    }

    handleMouseEnter() {
        this.closeAutoPlay();
    }

    handleMouseLeave() {
        this.closeAutoPlay();
        this.startAutoPlay();
    }

    render() {
        const {props} = this;
        return (
            <div
                className={`carousel-wrapper ${props.className || ''}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {this.renderArrowLeftBtn()}
                {this.renderArrowRightBtn()}
                {this.renderSlider()}
                {props.data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`carousel-img-${index} ${this.state.activeIndex === index ? 'active' : ''} carousel-common`}>
                            {item}
                        </div>
                    )
                })}
            </div>
        );
    }
}
