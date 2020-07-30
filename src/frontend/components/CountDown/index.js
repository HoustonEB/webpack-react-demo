import React, { Component, useState } from 'react';
import { c, h } from '@src/frontend/components/utils';
import PropTypes from 'prop-types';
import './style.use.less';


// function CountDown(props) {
//     const { classPrefix, startTime, endTime } = props;
//     let countDownTime = (endTime - startTime) / 1000;
//     const [{ day, min, sec }, updateTime] = useState(calcDateData.bind(this, props, countDownTime));
//     setTimeout(() => {
//         updateTime(calcDateData.bind(this, props, countDownTime));
//         console.log(countDownTime, 'countDownTime')
//     }, 1000)
//     return (
//         h.div(c('count-down-wrapper', classPrefix), {},
//             h.span('', {}, day),
//             h.span('', {}, '天'),
//             h.span('', {}, min),
//             h.span('', {}, '分'),
//             h.span('', {}, sec),
//             h.span('', {}, '秒')
//         )
//     )
// }
// function calcDateData(props, countDownTime) {
//     // const {startTime, endTime} = props;
//     // let countDownTime = (endTime - startTime) / 1000;
//     countDownTime--
//     let day = Math.floor(countDownTime / (60 * 60 * 24));
//     let min = Math.floor((countDownTime / 60) % 60);
//     let sec = Math.floor(countDownTime % 60);
//     // console.log(countDownTime, '--')
//     console.log(day, min, sec, 'update')
//     return {
//         day,
//         min,
//         sec
//     }
// }
// export default CountDown;
export default class CountDown extends Component {

    static propTypes = {
        classPrefix: PropTypes.string,
        startTime: PropTypes.number,
        endTime: PropTypes.number
    };

    static defaultProps = {
        classPrefix: ''
    };


    state = {
        day: 0,
        hour: 0,
        min: 0,
        sec: 0,
        firstRender: true,
        enableDayAnim: false,
        enableHourAnim: false,
        enableMinAnim: false,
        enableSecAnim: false
    };
    timer;

    constructor(props) {
        super(props);
        const { startTime, endTime } = props;
        let countDownTime = (endTime - startTime) / 1000;
        this.timer = setInterval(() => {
            countDownTime--
            if (countDownTime <= 0) {
                clearInterval(this.timer);
                return false;
            }
            this.calcDateData(countDownTime);
        }, 1000)
    }

    componentWillMount() { }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    addNumZero(num, type) {
        if((type === 'sec' || type === 'min') && +num === 60) {
            return 59;
        } else if(type === 'hour' && +num === 25) {
            return 24;
        }
        return num < 10 ? '0' + num : num;
    }

    calcDateData(countDownTime) {
        let day = Math.floor(countDownTime / (60 * 60 * 24));
        let hour = Math.floor((countDownTime / (60 * 60)) % 24);
        let min = Math.floor((countDownTime / 60) % 60);
        let sec = Math.floor(countDownTime % 60);
        this.setState((prevState, props) => {
            let { firstRender } = prevState;
            let nextState = {
                day: this.addNumZero(day),
                hour: this.addNumZero(hour),
                min: this.addNumZero(min),
                sec: this.addNumZero(sec)
            };
            let enableDayAnim = !firstRender && prevState.day !== nextState.day ? true : false;
            let enableHourAnim = !firstRender && prevState.hour !== nextState.hour ? true : false;
            let enableMinAnim = !firstRender && prevState.min !== nextState.min ? true : false;
            let enableSecAnim = !firstRender && prevState.sec !== nextState.sec ? true : false;
            return Object.assign(nextState, {
                enableDayAnim,
                enableHourAnim,
                enableMinAnim,
                enableSecAnim,
                firstRender: false
            });
        });
    }

    componentDidUpdate() {

    }

    render() {
        let { classPrefix } = this.props;
        let {
            day,
            hour,
            min,
            sec,
            enableDayAnim,
            enableHourAnim,
            enableMinAnim,
            enableSecAnim
        } = this.state;
        return (
            h.div(c('count-down-wrapper', classPrefix), {},
                h.div('common-time-style day-wrapper', {},
                    h.p('', {}, day),
                    h.p(
                        c('place-holder', { 'flip-to-bottom': enableDayAnim }),
                        {},
                        this.addNumZero(Number(day) + 1)
                    ),
                    h.p('', {}, '天'),
                ),
                h.div('common-time-style hour-wrapper', {},
                    h.p('', {}, hour),
                    h.p(
                        c('place-holder', { 'flip-to-bottom': enableHourAnim }),
                        {},
                        this.addNumZero(Number(hour) + 1, 'hour')
                    ),
                    h.p('', {}, '时'),
                ),
                h.div('common-time-style min-wrapper', {},
                    h.p('', {}, min),
                    h.p(
                        c('place-holder', { 'flip-to-bottom': enableMinAnim }),
                        {},
                        this.addNumZero(Number(min) + 1, 'min')
                    ),
                    h.p('', {}, '分'),
                ),
                h.div('common-time-style sec-wrapper', {},
                    h.p('', {}, sec),
                    h.p(
                        c('place-holder', { 'flip-to-bottom': enableSecAnim }),
                        {},
                        this.addNumZero(Number(sec) + 1, 'sec')
                    ),
                    h.p('', {}, '秒')
                )
            )
        )
    }
}