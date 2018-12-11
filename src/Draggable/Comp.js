import React, {Component} from 'react';
import cat from './cat.jpg';
import './style.use.less';

export default class View extends Component {

    constructor(props) {
        super(props);
        this.reader = new FileReader();
    }

    componentDidMount() {
        let imgDom = document.getElementsByTagName('img')[0];
        let dropDom = document.getElementsByClassName('right-div')[0];
        imgDom.addEventListener('dragstart', e => {
            // e.preventDefault();
            // e.dataTransfer.setData("Text", e.target.tagName);
            console.log('drag-start')
        });
        dropDom.addEventListener('dragenter', e => {
            e.preventDefault();
            console.log('dragenter')
        });
        dropDom.addEventListener('dragover', e => {
            e.preventDefault();
            console.log('drag-over')
        });
        dropDom.addEventListener('drop', e => {
            e.preventDefault(); // google拖放后默认开启预览图片模式
            // let data = e.dataTransfer.getData("Text");
            let file = e.dataTransfer.files[0];
            this.reader.readAsDataURL(file);
            this.reader.onload = function (e) {
                dropDom.innerHTML = `<img src='${this.result}'/>`;
            };
            console.log('drop')
        });
    }

    render() {
        return (
            <div className={'draggable-wrapper'}>
                <img draggable={true} src={cat}></img>
                <div className={'right-div'}>拖拽文件上传</div>
            </div>
        )
    }
}