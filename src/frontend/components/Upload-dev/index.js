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
import urlUtils from '@befe/utils/lib/url-utils';
import { noop, noopPromise, isIeBelow10 as isIEBelow10, getFileExtension, isCallable } from '@befe/erp-comps/v2/common/utils'
import { format, parse } from 'url';
import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';
import Icon from '@befe/erp-comps/v2/components/Icon';
import upload from './upload';
import PreviewModal from 'common/components/PreviewModal';

const resourceCodeKey = 'resource-codes'
const isIeBelow10 = isIEBelow10();
const UNIT = 1024 * 1024;

export default class UploadDev extends Component {
    static propTypes = {
        className: PropTypes.string,
        renderContent: PropTypes.node,
        fileList: PropTypes.array,
        multiple: PropTypes.bool,
        params: PropTypes.object,
        headers: PropTypes.object,
        fileName: PropTypes.string,
        beforeUpload: PropTypes.func,
        onAdd: PropTypes.func,
        onUploadDone: PropTypes.func,
        onRemove: PropTypes.func,
        maxSize: PropTypes.number,
        accept: PropTypes.string,
        overSizeTips: PropTypes.string,
        beforeRemove: PropTypes.func,
        onRemove: PropTypes.func,
        uploadingNote: PropTypes.string
    };

    static defaultProps = {
        className: 'offer',
        fileList: [],
        multiple: false,
        params: {},
        headers: {},
        fileName: 'file',
        maxSize: 5,
        overSizeTips: '文件过大',
        uploadingNote: '上传中...',
        accept: ''
    };
    fileEle;

    state = {
        fileList: [],
        status: 'wait',
        percent: 0,
        visible: false,
        previewIndex: 0
    };

    componentWillMount() {
        style.use();
        this.setState({ fileList: this.props.fileList });
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ fileList: nextProps.fileList });
    }

    componentWillUnmount() {
        style.unuse();
    }

    renderUpload() {
        let { renderContent, accept, multiple } = this.props;
        let labelDom = '';
        if (renderContent) {
            labelDom = renderContent;
        } else {
            labelDom = this.renderDefaultUpload();
        }

        return (
            h.div('offer-upload-label-wrapper', {
                onClick: this.handleClickInput
            },
                labelDom,
                h.input('offer-upload-input-file', {
                    type: 'file',
                    accept,
                    multiple,
                    ref: node => { this.fileEle = node },
                    onChange: this.handleUploadChange
                })
            )
        )
    }

    renderDefaultUpload() {
        return (
            h.div('offer-upload-icon', {},
                h(Icon, { name: 'op-transmit-upload' })
            )
        )
    }

    renderUploading() {
        let { uploadingNote } = this.props;
        let { percent, status } = this.state;
        const strokeColor = status === 'fail' ? '#E64552' : '#3D88F2';
        return (
            h.div('offer-upload-file-loading', {},
                h.span('uploading-note', {}, uploadingNote),
                h.span('progress-wrapper', {},
                    <Line
                        className={c('progress')}
                        percent={percent}
                        strokeWidth="5"
                        strokeColor={strokeColor}
                    />
                )
            )
        )
    }

    renderFileList() {
        let { fileList } = this.state;
        let fileItem = fileList && fileList.map((item, index) => {
            return (
                h.li('offer-upload-file-list-item', { key: index },
                    h.div('offer-upload-file-list-preview', {},
                        h.img('', {
                            src: item.url,
                            alt: item.name
                        })
                    ),
                    h.div('offer-upload-file-list-actions', {},
                        h.span('offer-upload-file-list-actions-common offer-upload-file-list-actions-preview',
                            {
                                onClick: () => {this.handlePreviewContent(index)}
                            },
                            h(Icon, { name: 'status-visible', size: 'small' })
                        ),
                        h.a('offer-upload-file-list-actions-common offer-upload-file-list-actions-download',
                            { href: item.url },
                            h(Icon, { name: 'transmit-download', size: 'small' })
                        ),
                        h.span('offer-upload-file-list-actions-common offer-upload-file-list-actions-delete',
                            {
                                onClick: () => { this.handleRemoveItem(item) }
                            },
                            h(Icon, { name: 'op-common-delete', size: 'small' })
                        )
                    )
                )
            )
        })
        return (
            h.div('offer-upload-file-list-wrapper',
                {},
                h.ul('offer-upload-file-list-ul', {},
                    fileItem
                )
            )
        )
    }

    handleClickInput = () => {
        this.fileEle.click();
    }

    handlePreviewContent = index => {
        this.setState({
            visible: !this.state.visible,
            previewIndex: index
        });
    }

    handleUploadChange = () => {
        let {
            url,
            params,
            headers,
            fileName,
            multiple,
            beforeUpload,
            onAdd,
            onUploadDone
        } = this.props;
        let { status } = this.state;
        let percent = 0;
        let file = multiple ? this.fileEle.files : this.fileEle.files[0];
        let isVerify = beforeUpload ? beforeUpload(file) : this.verifyFile(multiple ? Array.from(file) : [file]);
        console.log(isVerify, 'isVerify')
        if (!isVerify) {
            return false;
        }
        this.setState({ status: 'uploading', percent: 0 });
        let timer = setInterval(() => {
            if (percent >= 80) {
                clearInterval(timer);
            }
            this.setState({ percent: percent });
            percent += 10;
        }, 200)
        upload(url,
            {
                file,
                params,
                headers,
                fileName
            }).then((res) => {
                clearInterval(timer);
                this.setState({ percent: 90 });
                setTimeout(() => {
                    this.setState({ status: 'done', percent: 100 });
                    onAdd && onAdd(res.body, file);
                    console.log(res, 'res')

                    onUploadDone && onUploadDone(res.body, file);
                    this.resetFileInput();
                }, 1000)
            })
    }

    handleRemoveItem(file) {
        let { beforeRemove, onRemove, onChange } = this.props;
        let promise = beforeRemove ? beforeRemove(file) : Promise.resolve('noop');
        promise.then(res => {
            let fileList = this.state.fileList;
            let delIndex = fileList.findIndex(item => item === file);
            if (delIndex > -1) {
                fileList.splice(delIndex, 1);
                this.setState({ fileList: fileList })
            }
            console.log(delIndex, 'delIndex')
            onRemove && onRemove(fileList);
            onChange && onChange();
        })
    }

    verifyFile = files => {
        const { maxSize, accept, mode, overSizeTips } = this.props;
        if (files && files.length > 0) {
            if (maxSize && files.some(item => item.size > maxSize * UNIT)) {
                Message.error(overSizeTips);
                return false;
            };
            /**
             * mode 文件类型针对拖拽上传校验
             */
            if (accept) {
                const acceptArray = accept.split(',');
                const fileType = files.map(item => item.name.split('.')[1]);
                if (accept && accept !== '*' && !fileType.every(item => acceptArray.includes('.' + item))) {
                    Message.error(`文件类型必须是${accept}`);
                    return false;
                }
                return true;
            }
            return true;
        }
        return false;
    };

    resetFileInput() {
        this.fileEle && (this.fileEle.value = '');
    }

    renderPreview() {
        return h(PreviewModal, {
            visible: this.state.visible,
            fileList: this.props.fileList,
            currentIndex: this.state.previewIndex,
            onClose: () => {this.setState({visible: false})}
        });
    }

    render() {
        let {
            className
        } = this.props;
        let { status } = this.state;
        return (
            h.div(c(className, {
                'offer-upload-wrapper': true
            }),
                {},
                this.renderFileList(),
                status === 'uploading' ? this.renderUploading() : null,
                this.renderUpload(),
                this.renderPreview()
            )
        )
    }
}
