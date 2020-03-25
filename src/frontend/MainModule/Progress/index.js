
import React, { Component } from 'react';
import { h } from '@src/frontend/global/utils';
import Progress from '@src/frontend/components/Progress';
import Button from '@src/frontend/components/Button';
import './style.use.less';

export default class View extends Component {

    state = {
        num: 0
    }
    handleIncrease() {
        this.setState(prevState => {
            const {num} = prevState;
            return {
                num: num < 100 ? num + 10 : 100
            }
        })
    }

    handleMinus() {
        this.setState(prevState => {
            const {num} = prevState;
            return {
                num: num > 0 ? num - 10 : 0
            }
        })
    }
    render() {
        const smallStyle = {
            marginTop: '10px',
            width: '170px',
            lineheight: 0
        }
        return (
            h.div('', {},
               h.div('', {style: smallStyle}, h(Progress, {percent: 100, size: 'small', status: 'normal'})),
               h.div('', {style: smallStyle}, h(Progress, {percent: 70, size: 'small'})),
               h.div('', {style: smallStyle}, h(Progress, {percent: 30, size: 'small', status: 'exception'})),
               h.div('', {style: smallStyle}, h(Progress, {percent: 100, size: 'medium'})),
               h.div('', {style: smallStyle}, h(Progress, {percent: 30, size: 'medium'})),
               h.div('', {style: smallStyle}, h(Progress, {percent: 30, size: 'medium', strokeWidth: 20})),
               h.div('', {style: smallStyle}, h(Progress, {percent: 30, size: 'medium', strokeLineCap: 'square'})),
               h.div('' , {}, 
               h.div('', {style: smallStyle}, h(Progress, {percent: this.state.num, size: 'small'})),
            h(Button, {size: 'small', onClick: () => {this.handleIncrease()}}, '+'),
            h(Button, {size: 'small', onClick: () => {this.handleMinus()}}, '-')
               )
            )
        )
    }
}