import React, { Component } from 'react';
import cat from './cat.jpg';
import Upload from '@src/frontend/components/Upload';
import Upload2 from '@src/frontend/components/Upload2';
import './style.use.less';
import { h } from '@src/frontend/components/utils';
import quitPdf from './离职证明.pdf';

export default class View extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // let dropDom = document.getElementsByClassName('right-div')[0];

        // dropDom.addEventListener('dragenter', e => {
        //     e.preventDefault();
        //     console.log('dragenter')
        // });
        // dropDom.addEventListener('dragover', e => {
        //     e.preventDefault();
        //     console.log('drag-over')
        // });
        // dropDom.addEventListener('drop', e => {
        //     e.preventDefault(); // google拖放后默认开启预览图片模式
        //     // let data = e.dataTransfer.getData("Text");
        //     /** 
        //      * 从外部拖拽文件上传,浏览器内图片的不行
        //     */
        //     let reader = new FileReader();
        //     let file = e.dataTransfer.files[0];
        //     reader.readAsDataURL(file);
        //     reader.onload = function (e) {
        //         console.log(e.target, 'target')
        //         dropDom.innerHTML = `<img src='${reader.result}'/>`;
        //     };
        //     console.log('drop')
        // });
    }

    render() {
        
        return (
            h.div('draggable-wrapper', {},
                // h.div('right-div', {}, '拖拽文件上传'),
                // h.img('', { src: cat }),
                // h(Upload, { url: 'http://localhost:3000/upload', method: 'POST' },
                //     h.div('draggable-wrapper', {
                //         onClick: () => { console.log('upload') }
                //     },
                //         h.div('right-div', {}, '拖拽文件上传')
                //     )
                // ),
                h(Upload2, {
                    className: 'id-card-front-box',
                    labelStyle: {
                        width: '90px',
                        height: '68px',
                        lineHeight: '20px'
                    },
                    url: `/candidate/uploadFile`,
                    fileName: 'file',
                    accept: '.pdf,.jpeg,.jpg,.png',
                    onAdd: (res, file) => {
                    },
                    fileList: [
                    //     {
                    //     name: 'cat.jpg', 
                    //     id: 1,
                    //     canDel: true, 
                    //     url: require('../../MainModule/Upload/cat.jpg')
                    // },
                    {
                        name: '2332.pdf', 
                        id: 2,
                        canDel: true, 
                        url: require('./2332.pdf')
                    },
                    {
                        name: '离职证明.pdf',
                        id: 3,
                        canDel: true,
                        url: quitPdf
                    }
                ]
                }),
            )
        )
    }
}