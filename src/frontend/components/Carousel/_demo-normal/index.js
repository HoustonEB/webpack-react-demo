import React, {Component} from 'react';
import Carousel from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'CarouselNormal';
    static demoName = 'Carousel-Normal';

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
                this.setState({dire: 'top'});
                break;
            case 'right':
                this.setState({dire: 'right'});
                break;
            case 'bottom':
                this.setState({dire: 'bottom'});
                break;
            case 'left':
                this.setState({dire: 'left'});
                break;
            default:
                this.setState({dire: 'bottom'});
                break;
        }
    }

    render() {
        const {data, dire, data1} = this.state;
        return (
            <div>
                <div className={'first-item'}>
                    <button onClick={() => {this.changeSliderDire('top')}}>top</button>
                    <button onClick={() => {this.changeSliderDire('right')}}>right</button>
                    <button onClick={() => {this.changeSliderDire('bottom')}}>bottom</button>
                    <button onClick={() => {this.changeSliderDire('left')}}>left</button>
                    <Carousel
                        data={data}
                        sliderPosition={dire}
                        className={'home'}
                        effect={'scrollx'}
                        autoPlay={true}
                        autoInterval={2000}>
                    </Carousel>
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