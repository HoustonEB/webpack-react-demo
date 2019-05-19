import React, {Component} from 'react';
import './style.use.less';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import image9 from './9.svg';
import image4 from './4.svg';
import image5 from './5.svg';
import image7 from './7.svg';
import image3 from './3.svg';

export default class Page extends Component {
    render() {
        return (
            <div className={'carousel-wrapper'}>
                {/*<div className={"bg"}>*/}
                    {/*<img src={image4}/>*/}
                {/*</div>*/}
                <div className={"logo"}>
                    <img src={image5}/>
                </div>
                <div className={"person1"}>
                    <img src={image7}/>
                </div>
                <div className={"person2"}>
                    <img src={image9}/>
                </div>
                <div className={"person3"}>
                    <img src={image3}/>
                </div>
            </div>
        )
    }
}