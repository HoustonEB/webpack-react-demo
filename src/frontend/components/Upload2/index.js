/**
 * @file Upload
 * @description 文件上传组件
 * @author CaiYu
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {h, c} from '@src/frontend/components/utils';
import { action, observable } from 'mobx';
import style from './style.use.less';
import Message from '@src/frontend/components/Message';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';
// import Icon from '@befe/erp-comps/v2/components/Icon';
import upload from './upload';
import PreviewModal from '@src/frontend/components/PreviewModal';

const UNIT = 1024 * 1024;
const FILE_STATUS = {
    DONE: 'done',
    REMOVED: 'removed',
    ERROR: 'error',
}

export default class Upload2 extends Component {
    static propTypes = {
        className: PropTypes.string,
        renderContent: PropTypes.func,
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
        uploadingNote: PropTypes.string,
        onChange: PropTypes.func,
        maxFileCount: PropTypes.number,
        showUploadButton: PropTypes.bool,
        showDownloadIcon: PropTypes.bool,
        showPreviewIcon: PropTypes.bool,
        showDelIcon: PropTypes.bool,
        labelStyle: PropTypes.object,
        isCoverUploadLabel: PropTypes.bool,
        disabled: PropTypes.bool
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
        accept: '',
        showUploadButton: true,
        showDownloadIcon: true,
        showPreviewIcon: true,
        showDelIcon: true,
        labelStyle: {},
        isCoverUploadLabel: false,
        disabled: false
    };
    fileEle;
    progressTimer;

    state = {
        fileList: [],
        status: 'wait', // wait | uploading | done | error
        percent: 0,
        visible: false,
        previewIndex: 0
    };

    get isControlled() {
        return 'fileList' in this.props;
    }
    get showUploadButton() {
        const { maxFileCount, showUploadButton } = this.props;
        const { fileList = [] } = this.state;
        if (maxFileCount) {
            return showUploadButton && fileList.length < maxFileCount;
        }
        return showUploadButton;
    }

    componentWillMount() {
        // style.use();
        this.setState({ fileList: this.addFileListStatus(this.props.fileList) });
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ fileList: this.addFileListStatus(nextProps.fileList) });
    }

    componentWillUnmount() {
        // style.unuse();
    }

    addFileListStatus(fileList = []) {
        return fileList.map(item => {
            if (!item.status) {
                item.status = FILE_STATUS.DONE;
            }
            return item;
        })
    }

    renderUpload() {
        let { renderContent, accept, multiple, labelStyle, disabled } = this.props;
        let labelDom = '';
        if (renderContent) {
            labelDom = renderContent();
        } else {
            labelDom = this.renderDefaultUpload();
        }

        return (
            h.div(c('offer-upload-label-wrapper', { disabled: disabled }), {
                style: { ...labelStyle },
                onClick: disabled ? null : this.handleClickInput
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
                h.img('', { src: require('./images/upload.svg') })
            )
        )
    }

    renderUploading() {
        let { uploadingNote, labelStyle, isCoverUploadLabel } = this.props;
        let { percent, status } = this.state;
        const strokeColor = status === 'fail' ? '#E64552' : '#3D88F2';
        return (
            h.div(c('offer-upload-file-loading',
                {
                    'hover-file-upload-label': isCoverUploadLabel
                }),
                {
                    style: { ...labelStyle }
                },
                h.div('uploading-content-box', {},
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
        )
    }

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

    renderFileIcon(item) {
        let fileType = this.getFileIcon(item);
        let type = 'unknown';
        switch (fileType) {
            case 'image':
                type = item.thumbUrl || item.url;
                break;
            case 'pdf':
                type = require('./images/pdf.svg');
                break;
            case 'word':
                type = require('./images/word.svg');
                break;
            case 'zip':
                type = require('./images/zip.svg');
                break;
            case 'excel':
                type = require('./images/excel.svg');
                break;
            default:
                type = require('./images/other.svg');
        }
        return h.img(fileType === 'image' ? '' : 'file-type-img', {
            src: type
        });
    }

    renderFileList() {
        let { fileList, status } = this.state;
        let { showDownloadIcon, showPreviewIcon, showDelIcon, labelStyle } = this.props;
        let fileItem = [];
        if (fileList && fileList.length > 0) {
            fileItem = fileList.map((item, index) => {
                return (
                    h.li(`offer-upload-file-list-item ${item.status || FILE_STATUS.DONE}`,
                        {
                            key: index,
                            style: { ...labelStyle },
                            onClick: e => { this.handlePreviewContent(e, index, item) }
                        },
                        h.div('offer-upload-file-list-preview', {
                            style: { ...labelStyle }
                        },
                            item.status === FILE_STATUS.ERROR ? h.img('file-type-img', {
                                src: require('./images/error.svg')
                            }) : this.renderFileIcon(item),
                            h.div('offer-upload-file-list-actions', {
                                onClick: e => { e.stopPropagation(); }
                            },
                                showPreviewIcon ? h.span('offer-upload-file-list-actions-common offer-upload-file-list-actions-preview',
                                    {
                                        onClick: e => { this.handlePreviewContent(e, index, item) }
                                    },
                                    h.img('', { src: require('./images/preview.svg') })
                                ) : null,
                                showDownloadIcon ? h.a('offer-upload-file-list-actions-common offer-upload-file-list-actions-download',
                                    { href: item.url },
                                    // h(Icon, { name: 'transmit-download', size: 'small' })
                                    h.span('', {}, '下载')
                                ) : null,
                                showDelIcon ? (typeof item.canDel === 'undefined' ? true : item.canDel) && h.span(c('offer-upload-file-list-actions-common offer-upload-file-list-actions-delete'),
                                    {
                                        onClick: e => { this.handleRemoveItem(e, item) }
                                    },
                                    // h(Icon, {
                                    //     name: 'op-common-delete',
                                    //     size: 'small'
                                    // })
                                    h.span('', {}, '删除')
                                ) : null
                            ),
                        ),
                        item.status === FILE_STATUS.ERROR ? null : h.div('offer-file-name', { title: item.name }, item.name || '--')
                    )
                )
            })
        }
        fileItem.push(this.showUploadButton ? h.li(`offer-upload-file-list-item upload-operate-icon`, {
            key: 'operate-icon',
            style: { ...labelStyle }
        },
            status === 'uploading' ? this.renderUploading() : null,
            this.renderUpload()
        ) : null)

        return (
            h.div('offer-upload-file-list-wrapper',
                {},
                h.ul('offer-upload-file-list-ul clearfix', {},
                    fileItem
                )
            )
        )
    }

    handleClickInput = () => {
        this.fileEle.click();
    }

    handlePreviewContent = (e, index, item) => {
        e.stopPropagation();
        let isCanPreview = this.filterPreviewFile(item);
        
        if(!isCanPreview) {
            Message.alert('该文件格式,暂不支持预览');
            return false;
        }
        this.setState({
            visible: !this.state.visible,
            previewIndex: index
        });
    }

    filterPreviewFile(item) {
        let fileType = this.getFileIcon(item);
        let isCanPreview = false;
        switch (fileType) {
            case 'image':
            case 'pdf':
                isCanPreview = true;
                break;
            default:
                isCanPreview = false;
        }
        return isCanPreview;
    }

    handleUploadChange = () => {
        let {
            url,
            params,
            headers,
            fileName,
            multiple,
            beforeUpload
        } = this.props;
        let percent = 0;
        let file = multiple ? this.fileEle.files : this.fileEle.files[0];
        let isVerify = beforeUpload ? beforeUpload(file) : this.verifyFile(multiple ? Array.from(file) : [file]);
        console.log(isVerify, 'isVerify')
        if (!isVerify) {
            return false;
        }
        this.setState({ status: 'uploading', percent: 0 });
        this.progressTimer = setInterval(() => {
            if (percent >= 80) {
                clearInterval(this.progressTimer);
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
            }).then(
                doneRes => {
                    this.handleUploadDone(doneRes, doneRes.file);
                },
                errorRes => {
                    this.handleUploadError(null, errorRes.file);
                }
            ).finally(res => {
                clearInterval(this.progressTimer);
                this.resetFileInput();
            })
    }

    handleUploadDone(res, file) {
        const { onAdd, onUploadDone, onChange } = this.props;
        clearInterval(this.progressTimer);
        this.setState({ percent: 90 });
        setTimeout(() => {
            this.setState({
                status: 'done',
                percent: 100,
                visible: false
            });
            if (this.getFileIcon(file) === 'image') {
                file.thumbUrl = URL.createObjectURL(file);
            }
            onAdd && onAdd(res, file);
            onUploadDone && onUploadDone(res, file);
            onChange && onChange(res, file);
        }, 500);
    }

    handleUploadError(res, file) {
        const { onChange } = this.props;
        clearInterval(this.progressTimer);
        this.setState({ status: 'done', percent: 100 });

        let fileList = this.state.fileList.slice();
        fileList.push({ name: file.name, status: FILE_STATUS.ERROR });
        this.setState({ fileList: fileList });
        onChange && onChange(res, file, fileList);
    }

    handleRemoveItem(e, file) {
        e.stopPropagation();
        let { beforeRemove, onRemove, onChange } = this.props;
        let { fileList } = this.state;
        let promise = beforeRemove && file.status !== FILE_STATUS.ERROR ? beforeRemove(fileList, file) : Promise.resolve('noop');
        promise.then(res => {
            if (res === 'fail') { return; }
            let fileList = this.state.fileList;
            let delIndex = fileList.findIndex(item => item === file);
            if (delIndex > -1) {
                fileList.splice(delIndex, 1);
                this.setState({ fileList: fileList })
            }
            onRemove && onRemove(fileList, file);
            onChange && onChange(fileList, file);
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
                const fileType = files.map(item => item.name.split('.')[item.name.split('.').length - 1]);
                if (accept && accept !== '*' && !fileType.every(item => acceptArray.includes('.' + item.toLowerCase()))) {
                    Message.error(`文件类型必须是${acceptArray.join('/')}`);
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
    get showPreviewModal() {
        let { fileList } = this.props;
        let { visible } = this.state;
        return visible && fileList && fileList.length > 0;
    }
    renderPreview() {
        let {fileList = []} = this.props;
        let {previewIndex} = this.state;
        let previewList = fileList.filter(item => this.filterPreviewFile(item));
        let actualIndex = previewList.findIndex(item => item === fileList[previewIndex]);
        return h(PreviewModal, {
            visible: this.showPreviewModal,
            fileList: previewList,
            currentIndex:  actualIndex < 0 ? 0 : actualIndex,
            onClose: () => { this.setState({ visible: false }) }
        });
    }

    render() {
        let {
            className,
            fileList
        } = this.props;
        let { status } = this.state;
        return (
            h.div(c(className, {
                'offer-upload-wrapper': true
            }),
                {},
                this.renderFileList(),
                this.props.fileList && this.props.fileList.length > 0 ? this.renderPreview() : null
            )
        )
    }
}
