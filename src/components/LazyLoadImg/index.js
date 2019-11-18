import React, {Component} from 'react';
import {throttle} from '/src/global/utils'
import './style.use.less';

export default class LazyLoadImg extends Component {

    state = {
        imageData: new Array(300).fill({imgUrl: 'https://bpic.588ku.com/element_list_pic/19/09/17/6c2c834c5d49be8ee036137651f79dc2.jpg!/fw/250/quality/99/unsharp/true/compress/true'})
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.handleScroll();
        document.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll = throttle(function () {
        let clientHeight = this.getStyle('clientHeight');
        let scrollTop = this.getStyle('scrollTop');
        let imgDom = Array.from(document.getElementsByTagName('img'));

        imgDom = imgDom.filter(item => {
            if (item.getAttribute('data-loaded') === 'false') {
                return item;
            }
        });
        imgDom.forEach((item) => {
            if (item.offsetTop <= clientHeight + scrollTop) {
                item.setAttribute('src', item.getAttribute('data-url'));
                item.setAttribute('data-loaded', true);
            }
        });
    }, 200, 300);

    getStyle(type) {
        if (type) {
            let typeCount = document.documentElement[type] || document.body[type];
            return typeCount;
        } {
            throw new Error('未传入获取的样式');
        }
    }

    render() {
        const {imageData} = this.state;
        return (
            <div className={'lazy-load-img-wrapper'}>
                {imageData.map((item, index) => {
                    return (
                        <img key={index} data-url={item.imgUrl} data-loaded={false} alt=""/>
                    )
                })}
            </div>
        )
    }
}