import React, {Component} from 'react';
import './style.use.less';

export default class View extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let dropDom = document.getElementsByClassName('right-div')[0];
        
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
            /** 
             * 从外部拖拽文件上传,浏览器内图片的不行
            */
            let reader = new FileReader();
            let file = e.dataTransfer.files[0];
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                console.log(e.target, 'target')
                dropDom.innerHTML = `<img src='${reader.result}'/>`;
            };
            console.log('drop')
        });
    }

    render() {
        return (
            <div className={'draggable-wrapper'}>
                <div className={'right-div'}>拖拽文件上传</div>
            </div>
        )
    }
}