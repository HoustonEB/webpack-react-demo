/**
 * @file Upload
 * @description 文件上传组件
 * @author CaiYu
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {h, c} from '@src/frontend/components/utils';
import { action, observable } from 'mobx';
import './style.use.less';
import Message from '@src/frontend/components/Message';
import PropTypes from 'prop-types';
import 'rc-progress/assets/index.css';
import throttle from 'lodash/throttle';
// import Icon from '@befe/erp-comps/v2/components/Icon';
import ReactPDFWrap from '@src/frontend/components/ReactPDFWrap';
// import agent from 'utils/ajax-agent';

const prefixClass = 'preview-modal';
const scaleMap = [.10, .11, .13, .15, .17, .19, .21, .25, .29,
    .33, .37, .47, .57, .75, .97, 1, 1.17, 1.47, 1.77, 2.07, 2.57, 3.07, 3.57, 4.07, 4.57, 5.00];
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
        isAllScreen: false,
        currentIndex: 0,
        currentRotateNum: 0,
        currentScaleIndex: scaleMap.findIndex(item => item === .75),
        dragImg: false,
        showMessage: false
    };
    moveEle;
    headerEle;
    fileNameEle;
    offsetX;
    offsetY;
    draggableEle;
    pdfEle;
    previewContainer;
    dragHeader = false;
    clientX;
    clientY;
    body = document.body;
    cacheStyle = this.body.style;
    cacheImgPositionX = 0;
    cacheImgPositionY = 0;
    firstClickPs = true;
    oX = '-50%';
    oY = '-50%';
    oClientX = 0;
    oClientY = 0;

    componentWillMount() {
        // style.use();
        this.setState({ currentIndex: this.props.currentIndex });
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        let { currentScaleIndex } = this.state;
        if (this.props.visible) {
            window.addEventListener('mousedown', this.onMouseDown);
            window.addEventListener('mouseup', this.onMouseUp);
            this.previewContainer.addEventListener('mouseleave', this.onMouseLeave);
        } else {
            window.removeEventListener('mousedown', this.onMouseDown);
            window.removeEventListener('mouseup', this.onMouseUp);
            window.removeEventListener('mousemove', this.onMouseMove);
            this.previewContainer.removeEventListener('mouseleave', this.onMouseLeave);
        }
        if (prevState.currentIndex !== this.state.currentIndex) {
        }
    }

    componentWillReceiveProps(nextProps) {
        let { currentIndex, fileList } = nextProps;
        let updateIndex = this.props.fileList.length !== fileList.length ? 0 : currentIndex;
        this.setState({
            currentIndex: updateIndex,
            currentScaleIndex: this.initScaleNum(updateIndex),
            currentRotateNum: 0,
            isAllScreen: false
        });
        console.log('willReceiveProps')
    }

    componentWillUnmount() {
        // style.unuse();
        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
        this.previewContainer.removeEventListener('mouseleave', this.onMouseLeave);
    }

    initScaleNum(currentIndex) {
        if (this.isShowPdf(currentIndex)) {
            return scaleMap.findIndex(item => item === 1);
        }
        return scaleMap.findIndex(item => item === .75);
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
                    {
                        title: fileList[currentIndex].name || '--',
                        ref: node => { this.fileNameEle = node }
                    },
                    fileList[currentIndex].name || '--'
                ),
                h.span('close-wrapper',
                    {onClick: this.handleOnClose},
                    // h(Icon, {
                    //     name: 'op-common-close',
                    //     onClick: this.handleOnClose
                    // })
                    'X'
                )
            )
        )
    }

    handleOnClose = e => {
        let { onClose } = this.props;
        this.setState({ currentIndex: 0 });
        onClose && onClose();
    }

    onMouseLeave = e => {
        this.isLeave = true;
        if (this.state.dragImg) {
            this.cacheImgPositionX = e.clientX - this.clientX + this.cacheImgPositionX;
            this.cacheImgPositionY = e.clientY - this.clientY + this.cacheImgPositionY;
            this.setState({ dragImg: false });
            window.removeEventListener('mouseup', this.onMouseUp);
        }
        window.removeEventListener('mousemove', this.onMouseMove);
        console.log('leave')
    }

    onMouseDown = e => {
        let { currentScaleIndex } = this.state;
        if (e.target === this.headerEle || e.target === this.fileNameEle) {
            this.dragHeader = true;
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            window.addEventListener('mousemove', this.onMouseMove);
        } else if (this.isDraggable) {
            let { currentScaleIndex, currentRotateNum, currentIndex } = this.state;
            this.setState({ dragImg: true });
            if (this.firstClickPs) {
                this.oClientX = e.clientX;
                this.oClientY = e.clientY;
            }
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.draggableEle.style.transform = this.isShowPdf(currentIndex) ? `translate(
                calc(${this.oX} + ${e.clientX - this.clientX + this.cacheImgPositionX + 'px'}), 
                calc(${this.oY} + ${e.clientY - this.clientY + this.cacheImgPositionY + 'px'})) 
                scale(${scaleMap[currentScaleIndex]})` : `translate(
                calc(${this.oX} + ${this.cacheImgPositionX + 'px'}), 
                calc(${this.oY} + ${this.cacheImgPositionY + 'px'})) 
                scale(${scaleMap[currentScaleIndex]}) 
                rotate(${currentRotateNum}deg)`;
            window.addEventListener('mousemove', this.onMouseMove);
        } else {
            window.removeEventListener('mousemove', this.onMouseMove);
        }
        console.log('down')
    }

    onMouseUp = e => {
        this.dragHeader = false;
        this.firstClickPs = false;
        let { currentScaleIndex } = this.state;
        this.setState({ dragImg: false });
        if (this.isDraggable) {
            this.cacheImgPositionX = e.clientX - this.clientX + this.cacheImgPositionX;
            this.cacheImgPositionY = e.clientY - this.clientY + this.cacheImgPositionY;
        }
        console.log('up')
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove = throttle(e => {
        if (this.dragHeader) {
            this.moveEle.style.top = e.clientY - this.offsetY + 'px';
            this.moveEle.style.left = e.clientX - this.offsetX + 'px';
        } else if (this.state.dragImg) {
            let { currentScaleIndex, currentRotateNum, currentIndex } = this.state;
            this.draggableEle.style.transform = this.isShowPdf(currentIndex) ? `translate(
                calc(${this.oX} + ${e.clientX - this.clientX + this.cacheImgPositionX + 'px'}), 
                calc(${this.oY} + ${e.clientY - this.clientY + this.cacheImgPositionY + 'px'})) 
                scale(${scaleMap[currentScaleIndex]})` : `translate(
            calc(${this.oX} + ${e.clientX - this.clientX + this.cacheImgPositionX + 'px'}), 
            calc(${this.oY} + ${e.clientY - this.clientY + this.cacheImgPositionY + 'px'})) 
            scale(${scaleMap[currentScaleIndex]}) 
            rotate(${currentRotateNum}deg)`;
        }
        console.log('move')
    }, 100)

    getFileIcon(file) {
        const matchResult = /[^.]+$/.exec(file.name)
        const extension = matchResult && matchResult[0]
        let fileIcon = 'unknown'
        if (extension) {
            const ext = extension.toLowerCase()
            if (['jpg', 'jpeg', 'png', 'psd', 'gif', 'bmp'].includes(ext)) {
                fileIcon = 'image'
            }
            else if (['pdf'].includes(ext)) {
                fileIcon = 'pdf'
            }
            else if (['excel', 'xls', 'xlsm', 'xltm', 'xlsx', 'xlsx'].includes(ext)) {
                fileIcon = 'excel'
            }
            else if (['ppt', 'pptx'].includes(ext)) {
                fileIcon = 'ppt'
            }
            else if (['doc', 'docx'].includes(ext)) {
                fileIcon = 'word'
            }
            else if (['zip', 'rar', '7z'].includes(ext)) {
                fileIcon = 'zip'
            }
            else if (['msg', 'eml'].includes(ext)) {
                fileIcon = 'msg'
            }
            else if (['html', 'htm'].includes(ext)) {
                fileIcon = 'html'
            }
            else if (['txt'].includes(ext)) {
                fileIcon = 'txt'
            }
        }
        return fileIcon
    }

    renderPreviewContent() {
        let { fileList, visible } = this.props;
        let { currentIndex, showMessage } = this.state;
        return (
            h.div(`${prefixClass}-content-wrapper`,
                {
                    ref: node => { this.previewContainer = node }
                },
                !this.isShowPdf(currentIndex) && visible ? this.renderImg() : null,
                currentIndex <= 0 ? null : h.div('prev-btns',
                    {
                        onClick: this.handlePrev
                    },
                    // h(Icon, { name: 'to-left' })
                    h.span('', { name: 'to-left' }, '-')
                ),
                currentIndex >= (this.props.fileList.length - 1) ? null : h.div('next-btns',
                    {
                        onClick: this.handleNext
                    },
                    // h(Icon, { name: 'to-right' })
                    h.span('', { name: 'to-left' }, '+')
                ),
                this.isShowPdf(currentIndex) && visible ? this.renderPdf(fileList[currentIndex]) : null,
                this.renderOperateBtns(),
                showMessage ? this.renderMessage() : null
            )
        )
    }

    get isDraggable() {
        let {
            currentScaleIndex
        } = this.state;
        return scaleMap[currentScaleIndex] > 1;
    }

    renderImg() {
        let { fileList } = this.props;
        let {
            currentIndex,
            currentScaleIndex,
            currentRotateNum,
        } = this.state;
        return (
            h.div(`${prefixClass}-img-wrapper`, {},
                h.img(c({
                    'cursor': this.isDraggable
                }), {
                    draggable: !this.isDraggable,
                    ref: node => {
                        this.draggableEle = node;
                    },
                    src: fileList[currentIndex].url,
                    style: {
                        transform: `translate(${this.oX}, ${this.oY})
                        scale(${scaleMap[currentScaleIndex]}) rotate(${currentRotateNum}deg)`
                    }
                }),
            )
        )
    }

    renderPdf(file) {
        let {
            currentScaleIndex,
            currentRotateNum,
        } = this.state;
        return (
            h.div(c(`${prefixClass}-pdf-wrapper`, {
                'cursor': this.isDraggable
            }), {
                draggable: !this.isDraggable,
                ref: node => {
                    this.draggableEle = node;
                },
                style: {
                    transform: `translate(${this.oX}, ${this.oY})
                    scale(${scaleMap[currentScaleIndex]})`
                }
            },
                h(ReactPDFWrap, {
                    // className: 'show',
                    key: 'index',
                    path: file.url,
                    rotate: currentRotateNum,
                    onLoadingError: () => { },
                    onLoadingSuccess: () => { }
                })
            )
        )
    }

    isShowPdf(currentIndex) {
        let { fileList } = this.props;
        let fileType = '';
        if (fileList && fileList.length > 0) {
            fileType = this.getFileIcon(fileList[currentIndex]);
            return fileType === 'pdf';
        } else {
            return false;
        }
    }

    renderOperateBtns() {
        let { isAllScreen, currentScaleIndex } = this.state;
        return (
            h.div(`${prefixClass}-operate-btns-wrapper`, {},
                h.div('bottom-btns', {},
                    h.div('operate-btns-position-wrapper', {},
                        h.img('all-screen', {
                            src: isAllScreen ? require('./images/all-screen.svg') : require('./images/small-screen.svg'),
                            onClick: this.handleAllScreen
                        }),
                        h.div('line', {}, ''),
                        h.img('increase', {
                            src: require('./images/increase.svg'),
                            onClick: this.handleIncrease
                        }),
                        h.img('decrease', {
                            src: require('./images/decrease.svg'),
                            onClick: this.handleDecrease
                        }),
                        h.img('origin', {
                            src: currentScaleIndex !== scaleMap.findIndex(item => item === .75)
                                ? require('./images/1:1.svg') : require('./images/adapt.svg'),
                            onClick: this.handleOrigin
                        }),
                        h.div('line', {}, ''),
                        h.img('rotate', {
                            src: require('./images/rotate.svg'),
                            onClick: this.handleRotate
                        }),
                    )
                ),
            )
        )
    }

    initCacheImgPosition() {
        this.cacheImgPositionX = 0;
        this.cacheImgPositionY = 0;
    }

    handleAllScreen = () => {
        let { isAllScreen, currentIndex } = this.state;
        this.setState({
            isAllScreen: !isAllScreen,
            currentScaleIndex: this.initScaleNum(currentIndex),
            currentRotateNum: 0,
        });
        this.initCacheImgPosition();
    }

    handleIncrease = () => {
        console.dir(this.previewContainer, 'this.previewContainer')
        let { currentScaleIndex } = this.state;
        if (currentScaleIndex >= (scaleMap.length - 1)) {
            return;
        }
        this.setState({
            currentScaleIndex: ++currentScaleIndex,
            showMessage: true
        });
        this.closeMessage();
        this.initCacheImgPosition();
    }

    handleDecrease = () => {
        let { currentScaleIndex } = this.state;
        if (currentScaleIndex <= 0) {
            return;
        }
        this.setState({
            currentScaleIndex: --currentScaleIndex,
            showMessage: true
        });
        this.closeMessage();
        this.initCacheImgPosition();
    }

    handleOrigin = () => {
        let { currentScaleIndex } = this.state;
        this.setState({
            currentScaleIndex: currentScaleIndex === scaleMap.findIndex(item => item === .75)
                ? scaleMap.findIndex(item => item === 1) : scaleMap.findIndex(item => item === .75),
            showMessage: true
        });
        this.closeMessage();
        this.initCacheImgPosition();
    }

    handleRotate = () => {
        let { currentRotateNum } = this.state;
        this.setState({ currentRotateNum: currentRotateNum += 90 });
        this.initCacheImgPosition();
    }

    handlePrev = () => {
        let { currentIndex } = this.state;
        --currentIndex;
        this.setState({
            currentIndex: currentIndex,
            currentScaleIndex: this.initScaleNum(currentIndex),
            currentRotateNum: 0
        });
        this.initCacheImgPosition();
    }

    handleNext = () => {
        let { currentIndex } = this.state;
        ++currentIndex;
        this.setState({
            currentIndex: currentIndex,
            currentScaleIndex: this.initScaleNum(currentIndex),
            currentRotateNum: 0
        });
        this.initCacheImgPosition();
    }

    closeMessage() {
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.setState({ showMessage: false });
        }, 2000);
    }

    renderMessage() {
        let { currentScaleIndex } = this.state;
        let num = parseInt(scaleMap[currentScaleIndex] * 100) + '%';
        return (
            h.div(`${prefixClass}-message-wrapper`, {},
                num
            )
        )
    }

    render() {
        let {
            className,
            fileList,
            visible
        } = this.props;
        const { isAllScreen } = this.state;
        if (isAllScreen) {
            this.body.style = 'overflow: hidden;';
        } else {
            this.body.style = this.cacheStyle;
        }
        return (
            h.div(c(`${prefixClass}-wrapper ${className}`, {
                visible,
                'all-screen': isAllScreen
            }),
                {
                    ref: node => { this.moveEle = node; }
                },
                fileList && fileList.length > 0 ? this.renderHeader() : null,
                this.renderPreviewContent()
            )
        );
    }

}
