import React, {Component} from 'react';
import cat from './cat.jpg';
import './style.use.less';

export default class View extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let dragDom = document.getElementsByClassName('left-div')[0];
        let imgDom = document.getElementsByTagName('img')[0];
        let dropDom = document.getElementsByClassName('right-div')[0];
        imgDom.addEventListener('dragstart', e => {
            e.dataTransfer.setData("Text", e.target.tagName);
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
            e.preventDefault();
            let data = e.dataTransfer.getData("Text");
            console.log(data, 'data');
            dropDom.innerHTML = data;
            e.target.appendChild(imgDom);
            console.log('drop')
        });
    }

    render() {
        return (
            <div draggable={true} className={'draggable-wrapper'}>
                <img src={cat}></img>
                {/*<div draggable={true} className={'left-div'}></div>*/}
                <div className={'right-div'}></div>
            </div>
        )
    }
}