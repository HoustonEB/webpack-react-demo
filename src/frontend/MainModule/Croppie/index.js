
import React, { Component, useState, useEffect } from 'react';
import Croppie from 'croppie';
import 'croppie/croppie.css';
import { h } from '@src/frontend/global/utils';
import Button from '@src/frontend/components/Button';
import './style.use.less';

export default class CroppieView extends Component {
    state = {
        imgData: ''
    }

    constructor(props) {
        super(props);
        this.croppieEle = React.createRef();
    }

    componentDidMount() {
        console.log(this.croppieEle.current, 'croppieEle')
        this.Croppie = new Croppie(this.croppieEle.current, {
            viewport: { width: 100, height: 100 },
            boundary: { width: 300, height: 300 },
            showZoomer: false,
            enableOrientation: true
        });
        this.Croppie.bind({
            url: require('./cat.jpg'),
            orientation: 4
        });
    }

    render() {
        let {imgData} = this.state;
        return (
            h.div('', {}, '裁剪图片',
                h.div('img-container', { ref: this.croppieEle }, ''),
                h(Button, {
                    onClick: () => {
                        this.Croppie.result({
                            type: 'base64', 
                            size: 'viewport', // original裁剪后的图片按原始图片的大小显示
                            format: 'png',
                            quality: '1',
                            circle: false
                        }).then(res => {
                            this.setState({imgData: res});
                            // this.croppieEle.current.innerHTML = h(res);
                            console.log(res, 'res')
                        })
                    }
                }, '裁剪'),
                h.img('', {src: imgData}),
            )
        )
    }
}