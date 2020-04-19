/**
 * @file Upload
 * @description 文件上传组件
 * @author CaiYu
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Component, observer, h, c } from '@befe/utils/wrapper/erp';
import { action, observable } from 'mobx';
import style from './style.use.less';
import Message from '@befe/erp-comps/v2/components/Message';
import PropTypes from 'prop-types';
import 'rc-progress/assets/index.css';
import throttle from 'lodash/throttle';
import Icon from '@befe/erp-comps/v2/components/Icon';

const prefixClass = 'preview-modal';
const scaleMap = [.10, .11, .13, .15, .17, .19, .21, .25, .29, 
    .33, .37, .47, .57, .77, .97, 1.17, 1.47, 1.77, 2.07, 2.57, 3.07, 3.57, 4.07, 4.57, 5.00];
export default class PreviewModal extends Component {
    static propTypes = {
        className: PropTypes.string,
        fileList: PropTypes.array,
        visible: PropTypes.bool,
        mode: PropTypes.oneOf(['img', 'pdf']),
        onClose: PropTypes.func,
        currentIndex: PropTypes.number
    };

    static defaultProps = {
        className: '',
        fileList: [],
        visible: false,
        mode: 'img',
        currentIndex: 0
    };

    state = {
        currentIndex: 0,
        currentScaleNum: 1,
        currentRotateNum: 0,
        currentScaleIndex: 13,
        initScale: 0
    };
    moveEle;
    headerEle;
    offsetX;
    offsetY;
    imgEle;
    previewContainer;
    drag = false;

    componentWillMount() {
        style.use();
        this.setState({ currentIndex: this.props.currentIndex });
    }

    componentDidMount() {
        // this.initImgScale();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.visible) {
            window.addEventListener('mousedown', this.onMouseDown);
            window.addEventListener('mouseup', this.onMouseUp);
        } else {
            window.removeEventListener('mousedown', this.onMouseDown);
            window.removeEventListener('mouseup', this.onMouseUp);
            window.removeEventListener('mousemove', this.onMouseMove);
        }
        if(prevState.currentIndex !== this.state.currentIndex) {
            // this.initImgScale();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentIndex: nextProps.currentIndex
        });
    }

    componentWillUnmount() {
        style.unuse();
        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    renderHeader() {
        let {
            currentIndex
        } = this.state;
        let {
            fileList
        } = this.props;
        return (
            h.div(`${prefixClass}-header-wrapper`,
                { ref: node => { this.headerEle = node; } },
                h.span('file-name-wrapper',
                    {},
                    (fileList[currentIndex] && fileList[currentIndex].name) || '--'
                ),
                h.span('close-wrapper',
                    {},
                    h(Icon, {
                        name: 'op-common-close',
                        onClick: this.handleOnClose
                    })
                )
            )
        )
    }

    handleOnDrag = (e) => {
        console.log(e, 'sd', e.target)
    }

    handleOnClose = e => {
        let { onClose } = this.props;
        onClose && onClose();
    }

    onMouseDown = e => {
        this.drag = true;
        if (e.target === this.headerEle) {
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            window.addEventListener('mousemove', this.onMouseMove);
        } else {
            window.removeEventListener('mousemove', this.onMouseMove);
        }
        console.log('down');
    }

    onMouseUp = e => {
        this.drag = false;
        window.removeEventListener('mousemove', this.onMouseMove);
        console.log('up')
    }

    onMouseMove = throttle(e => {
        if (this.drag) {
            this.moveEle.style.top = e.clientY - this.offsetY + 'px';
            this.moveEle.style.left = e.clientX - this.offsetX + 'px';
        }
        console.log(e, 'move')
    }, 50)

    renderPreviewContent() {
        return (
            h.div(`${prefixClass}-content-wrapper`, 
            {
                ref: node => {this.previewContainer = node}
            },
                this.renderImg(),
                // this.renderPdf(),
                this.renderOperateBtns()
            )
        )
    }

    renderImg() {
        let { fileList } = this.props;
        let { currentIndex, currentScaleIndex, currentRotateNum } = this.state;
        return (
            h.div(`${prefixClass}-img-wrapper`, {},
                h.img('', {
                    ref: node => {
                        this.imgEle = node;
                    },
                    onLoad: this.initImgScale,
                    src: fileList[currentIndex].url,
                    style: {
                        transform: `translate(-50%, -50%) scale(${scaleMap[currentScaleIndex]}) rotate(${currentRotateNum}deg)`
                    }
                }),
            )
        )
    }

    renderPdf() {
        return (
            h.div(`${prefixClass}-pdf-wrapper`, {},
            )
        )
    }

    renderOperateBtns() {
        let { currentIndex } = this.state;
        return (
            h.div(`${prefixClass}-operate-btns-wrapper`, {},
                currentIndex <= 0 ? null : h.div('prev-btns', {
                    onClick: this.handlePrev
                }, '<'),
                currentIndex >= (this.props.fileList.length - 1) ? null : h.div('next-btns', {
                    onClick: this.handleNext
                }, '>'),
                h.div('bottom-btns', {},
                    h.span('', {onClick: this.handleIncrease}, '+'),
                    h.span('', {onClick: this.handleDecrease}, '-'),
                    h.span('', {onClick: this.handleRotate}, '转'),
                    h.span('', {onClick: this.handleRotate}, '1:1'),
                ),
            )
        )
    }

    initImgScale = () => {
        // console.dir(this.imgEle, 'this.imgEle')
        // console.log(this.imgEle.naturalHeight, 'this.imgEle.offsetWidth[[')
        // let naturalWidth = this.imgEle.naturalWidth;
        // let naturalHeight = this.imgEle.naturalHeight;
        // let scale = naturalWidth / naturalHeight;
        // console.log(naturalWidth, naturalHeight, scale, 'sss1')
        // if(naturalWidth >= naturalHeight) {
        //     this.imgEle.style.width = '100%';
        //     console.dir(this.imgEle, 'this.imgEle')
        //     console.log(this.imgEle.offsetWidth, 'this.imgEle.offsetWidth')
        //     this.imgEle.style.height = this.imgEle.offsetWidth / scale;
        // } else if(naturalWidth < naturalHeight) {
        //     this.imgEle.style.height = '100%';
        //     console.log(this.imgEle.offsetHeight, 'this.imgEle.offsetHeight')
        //     this.imgEle.style.width = this.imgEle.offsetHeight * scale;
        // }
        // let {naturalWidth, naturalHeight} =  this.imgEle;
        // let {offsetWidth, offsetHeight} = this.previewContainer;
        // console.log(naturalWidth, naturalHeight, offsetWidth, offsetHeight)
        // let scale = (offsetWidth * offsetHeight) / (naturalWidth * naturalHeight);
        // console.log(scale, 'scael')
        // this.setState({initScale: scale});

    }

    handleIncrease = () => {
        console.dir(this.previewContainer, 'this.previewContainer')
        let {currentScaleIndex} = this.state;
        if(currentScaleIndex >= (scaleMap.length - 1)) {
            return;
        }
        this.setState({currentScaleIndex: ++currentScaleIndex});
    }

    handleDecrease = () => {
        let {currentScaleIndex} = this.state;
        if(currentScaleIndex <= 0) {
            return;
        }
        this.setState({currentScaleIndex: --currentScaleIndex});
    }

    handleRotate = () => {
        let {currentRotateNum} = this.state;
        this.setState({currentRotateNum: currentRotateNum += 90});
    }

    handlePrev = () => {
        let { currentIndex } = this.state;
        this.setState({
            currentIndex: --currentIndex
        });
    }

    handleNext = () => {
        let { currentIndex } = this.state;
        this.setState({
            currentIndex: ++currentIndex
        });
    }

    render() {
        let {
            className,
            visible
        } = this.props;

        console.log(this.props, 'props');
        return (
            h.div(c(`${prefixClass}-wrapper ${className}`, {
                visible
            }),
                {
                    ref: node => { this.moveEle = node; }
                },
                this.renderHeader(),
                this.renderPreviewContent()
            )
        );
    }

}
