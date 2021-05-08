import React, { Component, createRef, createElement } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import './style.use.less';

const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);

export default class Signature extends Component {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        brushStyle: PropTypes.object
    };

    static defaultProps = {
        width: 300,
        height: 200,
        brushStyle: {
            lineWidth: 3, // 直线宽度
            strokeStyle: 'black', // 路径的颜色
            lineCap: 'round', // 直线首尾端圆滑
            lineJoin: 'round', // 当两条线条交汇时，创建圆形边角
            shadowBlur: 1, // 边缘模糊，防止直线边缘出现锯齿
            shadowColor: 'black' // 边缘颜色
        }
    };

    canvas;
    context;
    point = {
        x: 0,
        y: 0
    };
    pressed = false;
    start;
    move;
    optimizedMove;
    degree;

    constructor(props) {
        super(props);
        this.parentEleRef = createRef();
        this.rotate = this.rotate.bind(this);
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount() {
        document.querySelector('aside').style.display = 'none';
        document.querySelector('main').style.margin = '0';
        this.parentEle = this.parentEleRef.current;
        let {
            width,
            height
        } = window.getComputedStyle(this.parentEle, null);
        this.pW = width.replace('px', '');
        this.pH = height.replace('px', '');
        this.draw(0);
    }

    draw(degree) {
        this.degree = degree;
        this.createCanvas();
        this.start = this.create('start');
        this.move = this.create('move');
        this.optimizedMove = requestAnimationFrame ? (e) => {
            requestAnimationFrame(() => {
                this.move(e);
            });
        } : this.move;
        this.addEvent(this.canvas);
    }

    createCanvas() {
        // if (document.querySelector('canvas')) {
        //     this.parentEleRef.current.removeChild(document.querySelector('canvas'));
        // }
        // this.canvas = document.createElement('canvas');
        // this.parentEleRef.current.appendChild(this.canvas);
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');

        this.adaptDiffRatio(this.canvas, this.context);
    }

    initBrushStyle(context) {
        Object.assign(context, {
            ...this.props.brushStyle
        })
    }

    adaptDiffRatio(canvas, context) {
        let {
            width,
            height
        } = window.getComputedStyle(canvas, null);
        width = width.replace('px', '');
        height = height.replace('px', '');
        this.width = width;
        this.height = height;
        let devicePixelRatio = window.devicePixelRatio;

        if (devicePixelRatio) {
            canvas.width = width * devicePixelRatio;
            canvas.height = height * devicePixelRatio;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            context.scale(devicePixelRatio, devicePixelRatio);
        } else {
            canvas.width = width;
            canvas.height = height;
        }
        // 重置画布坐标系
        if (typeof this.degree === 'number') {
            context.rotate((this.degree * Math.PI) / 180);
            switch (this.degree) {
                case -90:
                    context.translate(-height, 0);
                    break;
                case 90:
                    context.translate(0, -width);
                    break;
                case -180:
                case 180:
                    context.translate(-width, -height);
                    break;
                default:
            }
        }
    }

    create(type) {
        const { left, top } = this.canvas.getBoundingClientRect();
        return (e) => {
            e.preventDefault();
            if (type === 'start') {
                this.pressed = true;
            }
            if (type === 'start' || this.pressed) {
                e = isMobile ? e.touches[0] : e;
                this.point.x = e.clientX - left + 0.5; // 不加0.5，整数坐标处绘制直线，直线宽度将会多1px(不理解的不妨谷歌下)
                this.point.y = e.clientY - top + 0.5;
                this.paint(type);
            }
        }
    }

    paint(type) {
        let context = this.context;
        let { x, y } = this.point;
        switch (type) {
            case 'start':
                context.beginPath();
                this.initBrushStyle(context);
                context.moveTo(x, y);
            case 'move': // 前面之所以没有break语句，是为了点击时就能描画出一个点
                context.lineTo(x, y);
                context.stroke();
                break;
        }
    }

    addEvent(canvas) {
        if (isMobile) {
            canvas.addEventListener('touchstart', this.start);
            canvas.addEventListener('touchmove', this.optimizedMove);
        } else {
            canvas.addEventListener('mousedown', this.start);
            canvas.addEventListener('mousemove', this.optimizedMove);
            ['mouseup', 'mouseleave'].forEach((event) => {
                canvas.addEventListener(event, () => {
                    this.pressed = false;
                });
            });
        }
    }

    rotate(e) {
        let degree = +e.target.value;
        let length = (this.pH - this.pW) / 2;
        let w = this.pW;
        let h = this.pH;
        switch (degree) {
            case -90:
                length = -length;
            case 90:
                w = this.pH;
                h = this.pW;
                break;
            default:
                length = 0;
        }
        this.parentEle.style = `
        transform: rotate(${degree}deg) translate(${length}px,${length}px);
        width: ${w}px;
        height: ${h}px;
        transform-origin: center;`;
        let canvasEle = document.querySelector('canvas');
        if (canvasEle) {
            this.parentEle.removeChild(canvasEle);
        }
        this.canvas = document.createElement('canvas');
        this.parentEle.appendChild(this.canvas);
        this.draw(-degree);
    }

    clear = () => {
        let width, height;
        switch (this.degree) { // this.degree是画布坐标系旋转的度数
            case -90:
            case 90:
                width = this.height; // 画布旋转之前的高度
                height = this.width; // 画布选择之前的宽度
                break;
            default:
                width = this.width;
                height = this.height;
        }
        this.context.clearRect(0, 0, width, height);
    }

    getPNGImage(canvas = this.canvas) {
        return canvas.toDataURL('image/png');
    }

    downloadPNGImage(image) {
        const url = image.replace('image/png', 'image/octet-stream;Content-Disposition:attachment;filename="test.png"');
        window.location.href = url;
    }

    download() {
        let image = this.getPNGImage(this.canvas);
        this.downloadPNGImage(image);
    }

    dataURLtoBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bStr = atob(arr[1]); // atob对base64进行解码,btoa对内容进行编码
        let n = bStr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bStr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    upload(blob, url, success, failure) {
        let image = this.getPNGImage(this.canvas);
        blob = this.dataURLtoBlob(image);
        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        xhr.withCredentials = true;
        formData.append('image', blob, 'sign.png'); // 第三个参数是传给服务器文件的名字

        xhr.open('POST', url, true);
        xhr.onload = () => {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                success(xhr.responseText);
            } else {
                failure();
            }
        };
        xhr.onerror = (e) => {
            if (typeof failure === 'function') {
                failure(e);
            } else {
                console.log(`upload img error: ${e}`);
            }
        };
        xhr.send(formData);
    }

    render() {
        return (
            <div
                className={'signature-wrapper'}
                ref={this.parentEleRef}>
                <div className="operate-btns-wrapper">
                    rotate:
                    <select onChange={this.rotate}>
                        <option value="0">0</option>
                        <option value="90">90</option>
                        <option value="180">180</option>
                        <option value="-90">-90</option>
                    </select>
                    {/* <Button onClick={this.rotate}>rotate: {degree}deg</Button> */}
                    &nbsp;
                    <Button onClick={this.clear}>Clear</Button>
                    <Button onClick={this.download}>Download</Button>
                    <Button onClick={this.upload}>Upload</Button>
                </div>
                <canvas id="signature-canvas"></canvas>
            </div>
        )
    }
}