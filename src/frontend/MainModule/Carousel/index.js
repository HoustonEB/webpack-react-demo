import React, { Component } from 'react';
import Carousel from '../../components/Carousel';
import Button from '@src/frontend/components/Button';
import { h } from '@src/frontend/global/utils';
import './style.use.less';

export default class carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                <div className={'content'}><span>1</span></div>,
                <div className={'content'}><span>2</span></div>,
                <div className={'content'}><span>3</span></div>,
                <div className={'content'}><span>4</span></div>,
                <div className={'content'}><span>5</span></div>
            ],
            data1: [
                <div className={'content'}><span>1</span></div>,
                <div className={'content'}><span>2</span></div>,
                <div className={'content'}><span>3</span></div>,
                <div className={'content'}><span>4</span></div>,
                <div className={'content'}><span>5</span></div>
            ],
            dire: 'bottom'
        }
    }

    changeSliderDire(dire) {
        switch (dire) {
            case 'top':
                this.setState({ dire: 'top' });
                break;
            case 'right':
                this.setState({ dire: 'right' });
                break;
            case 'bottom':
                this.setState({ dire: 'bottom' });
                break;
            case 'left':
                this.setState({ dire: 'left' });
                break;
            default:
                this.setState({ dire: 'bottom' });
                break;
        }
    }

    render() {
        const { data, dire, data1 } = this.state;
        return (
            <div>
                <div className={'first-item'}>
                    {h.div('', {},
                        h(Button, { onClick: () => { this.changeSliderDire('top') } }, 'top'),
                        h(Button, { onClick: () => { this.changeSliderDire('right') } }, 'right'),
                        h(Button, { onClick: () => { this.changeSliderDire('bottom') } }, 'bottom'),
                        h(Button, { onClick: () => { this.changeSliderDire('left') } }, 'left'),
                        h(Carousel, {
                            data,
                            sliderPosition: dire,
                            className: 'home',
                            effect: 'scrollx',
                            autoPlay: true,
                            autoInterval: 2000
                        })
                    )
                    }
                </div>
                <div className={'second-item'}>
                    <Carousel
                        data={data1}
                        sliderPosition={'bottom'}
                        className={'home'}
                        effect={'fade'}
                        autoPlay={true}
                        autoInterval={2000}>
                    </Carousel>
                </div>
            </div>
        )
    }
}