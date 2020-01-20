import React, { Component } from 'react';
import { h, c } from '/src/global/utils';
import PropTypes from 'prop-types';
import {upload} from './upload';
import './style.use.less';

export default class Upload extends Component {

    static propTypes = {
        classPrefix: PropTypes.string,
        className: PropTypes.string,
        mode: PropTypes.oneOf(['drag', 'file']),
        url: PropTypes.string,
        method: PropTypes.string
    };

    static defaultProps = {
        classPrefix: 'once',
        className: ''
    };
    uploadDom;
    constructor(props) {
        super(props);
    }

    triggerUpload(e) {
        e.stopPropagation();
        this.uploadDom.click();
    }

    upload(e) {
        const {url, method} = this.props;
        let files = this.uploadDom.files;
        upload(url, method, files);
    }

    render() {
        const {
            classPrefix,
            className,
            children,
            url,
            method
        } = this.props;
        return (
            h.div(`${classPrefix}-upload-wrapper ${className}`, {
                onClick: this.triggerUpload.bind(this),
            },
                h.input('', {
                    type: 'file',
                    ref: node => this.uploadDom = node,
                    url,
                    method,
                    style: {
                        display: 'none'
                    },
                    onChange: this.upload.bind(this)
                }),
                children
            )
        )
    }
}