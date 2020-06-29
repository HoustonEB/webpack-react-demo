/**
 * @file: ReactPDFWrap 状态对象
 * @author: yuzhuang
 * @date: 2019-11-9
 * @description: ReactPDFWrap 的状态入口页面
 *
 * pdf预览
 *
 */
import {h, isCallable, c} from '@src/frontend/components/utils';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Document, Page} from 'react-pdf/dist/entry.webpack';
// import { Document, Page } from 'react-pdf/dist/entry.noworker';
// import {Document, Page} from 'react-pdf';
import compStyle from './style.use.less';
// import Icon from '@befe/erp-comps/v2/components/Icon/index';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://hcm-bucket.cdn.bcebos.com/candidate/candidate20206121623/dist/76f264452281d51dc821.worker.js`;

export default class ReactPDFWrapState extends Component {

    static propTypes = {
        path: PropTypes.string, // pdf 文件url / base64 / unit8Array ??? 没有测试过
    };
    static defaultProps = {
        path: ''
    };
    state = {
        numPages: 1, // 总页数
        pageNumber: 1, // 当前页数
        pageNumList: [], // 页码list
    }

    isFireFox = false;

    constructor(props) {
        super(props);
        // 解决macos下52版本的firefox pdf文档选中错乱的问题
        this.isFireFox = this.testIsMacFirefox();
        // this.isFireFox = navigator.userAgent.indexOf('Firefox') > -1;
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        // compStyle.use();
    }

    componentWillUnmount() {
        // compStyle.unuse();
    }

    testIsMacFirefox() {
        const ua = navigator.userAgent.toLowerCase();
        const testVs = regexp => ua.match(regexp).toString().replace(/[^0-9|_.]/g, '').replace(/_/g, '.');
        const testUa = regexp => regexp.test(ua);

        return testUa(/macintosh|macintel/g) && testUa(/firefox/g);
    }

    state = {
        numPages: null,
        pageNumber: 1,
      }
    
      onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
      }


    render() {
        const {
            path,
            className,
            rotate
        } = this.props;
        const {pageNumList} = this.state;
        console.log(path, 'pdf---path')
        return h(Document, {
                className: `pdf-document-wrap ${className} ${this.isFireFox && 'firefox-wrapper'}`,
                file: path, // 文档地址
                renderMode: 'svg',
                loading: h.div('loading-content-wrapper', {},
                    // h(Icon,
                    //     {
                    //         type: 'img',
                    //         name: 'pln-loading'
                    //     }
                    // )
                    h.span('', {}, 'd')
                ),
                rotate,
                error: '',
                onLoadError: this.onDocumentLoadError,
                onLoadSuccess: this.onDocumentLoadSuccess,
            },
            pageNumList && pageNumList.map((pagenum, index) => h(Page, {
                    key: index, // 当前页页码
                    pageNumber: pagenum + 1,
                    renderMode: 'svg',
                    loading: h.div('loading-content-wrapper', {},
                        // h(Icon,
                        //     {
                        //         type: 'img',
                        //         name: 'pln-loading'
                        //     }
                        // ),
                        h.span('', {}, 'd')
                    ),
                    width: 588,
                    scale: 2, // pdf 模糊
                })
            )
        );
    }
    // 生成 纯页码数组
    List = len => [...new Array(len).keys()]

    onDocumentLoadSuccess = pdfObj => {
        if (pdfObj) {
            const {numPages} = pdfObj;
            this.setState({
                numPages: numPages,
                pageNumList: this.List(numPages)
            });
        }

        const {onLoadingSuccess} = this.props;
        if (isCallable(onLoadingSuccess)) {
            onLoadingSuccess();
        }
    }
    onDocumentLoadError = () => {
        const {onLoadingError} = this.props;
        if (isCallable(onLoadingError)) {
            onLoadingError();
        }

    }
}
