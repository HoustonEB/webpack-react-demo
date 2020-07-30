import React, {Component} from 'react';
import './style.use.less';

export default class Counter extends Component {
    static compsKey = 'Counter';
    eventFn;
    counterNum;

    constructor(props) {
        super(props)
        Object.assign(this, {
            counterNum: this.props.counterNum,
            eventFn: this.props.onChange
        });
    }

    handleInputFocus() {
        let input = document.querySelector('.counter-wrapper input');
        let leftDecrease = document.querySelector('.counter-wrapper .left-decrease');
        let rightIncrease = document.querySelector('.counter-wrapper .right-increase');
        input.style.borderColor = '#409eff #d3d3d3 #409eff';
        leftDecrease.style.borderColor = '#409eff';
        rightIncrease.style.borderColor = '#409eff';
    }

    handleInputBlur() {
        let input = document.querySelector('.counter-wrapper input');
        let leftDecrease = document.querySelector('.counter-wrapper .left-decrease');
        let rightIncrease = document.querySelector('.counter-wrapper .right-increase');
        input.style.borderColor = '#d3d3d3';
        leftDecrease.style.borderColor = '#d3d3d3';
        rightIncrease.style.borderColor = '#d3d3d3';
        if (Number(input.value ) > 10) {
            input.value = 10;
        }
        if (Number(input.value ) < 1) {
            input.value = 1;
        }
        let value = document.querySelector('.counter-wrapper input').value;
        if (Number(value) === 1) {
            leftDecrease.classList.add('hover-disabled');
            rightIncrease.classList.remove('hover-disabled');
        }
        if (Number(value) === 10) {
            rightIncrease.classList.add('hover-disabled');
            leftDecrease.classList.remove('hover-disabled');
        }
        this.eventFn(value);
    }

    handleDecrease() {
        let input = document.querySelector('.counter-wrapper input');
        let leftDecrease = document.querySelector('.counter-wrapper .left-decrease');
        let rightIncrease = document.querySelector('.counter-wrapper .right-increase');
        let value = Number(input.value);
        rightIncrease.classList.remove('hover-disabled');
        if (value > 1) {
            input.value = Number(input.value) - 1;
            leftDecrease.classList.remove('hover-disabled');
            let value = document.querySelector('.counter-wrapper input').value;
            this.eventFn(value);
        }
        if (value === 2) {
            leftDecrease.classList.add('hover-disabled');
        }
    }

    handleIncrease() {
        let input = document.querySelector('.counter-wrapper input');
        let leftDecrease = document.querySelector('.counter-wrapper .left-decrease');
        let rightIncrease = document.querySelector('.counter-wrapper .right-increase');
        let value = Number(input.value);
        leftDecrease.classList.remove('hover-disabled');
        if (value < 10) {
            input.value = Number(input.value) + 1;
            rightIncrease.classList.remove('hover-disabled');
            let value = document.querySelector('.counter-wrapper input').value;
            this.eventFn(value);
        }
        if (value === 9) {
            rightIncrease.classList.add('hover-disabled');
        }
    }

    handleInputChange() {
        let value = document.querySelector('.counter-wrapper input').value;
        if (Number(value) < 11 && Number(value) > 0) {
            this.eventFn(value);
        }
    }

    renderCounter() {
        return (
            <div className={'counter-wrapper'}>
                <span
                    className={`left-decrease ${this.counterNum === 1 ? 'hover-disabled' : null}`}
                    onClick={() => this.handleDecrease()}></span>
                <input
                    type="num"
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={this.counterNum}
                    onFocus={() => this.handleInputFocus()}
                    onBlur={() => this.handleInputBlur()}
                    onChange={() => this.handleInputChange()}/>
                <span
                    className={`right-increase ${this.counterNum === 10 ? 'hover-disabled' : null}`}
                    onClick={() => this.handleIncrease()}></span>
            </div>
        )
    }

    render() {
        return (
            this.renderCounter()
        )
    }
}