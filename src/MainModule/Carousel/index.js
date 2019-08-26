import React, {Component} from 'react';
import Carousel from '../../components/Carousel';
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
            ]
        }
    }

    render () {
        const {data} = this.state;
        return (
            <Carousel
                data={data}
                sliderPosition={'bottom'}
                className={'home'}>
            </Carousel>
        )
    }
}