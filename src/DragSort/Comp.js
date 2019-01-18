import React, { Component } from 'react';
import { observable, action, reaction, autorun } from 'mobx';
import { observer } from 'mobx-react';
import './style.use.less';

@observer
export default class View extends Component {
    data = [
        { id: 0, title: '0' },
        { id: 1, title: '1' },
        { id: 2, title: '2' },
        { id: 3, title: '3' },
        { id: 4, title: '4' },
        { id: 5, title: '5' },
        { id: 6, title: '6' },
        { id: 7, title: '7' },
        { id: 8, title: '8' },
        { id: 9, title: '9' },
    ];
    @observable sortData = [];
    @observable dom;
    @observable lis;
    dragDom;
    enterDom;
    dragIndex;
    enterIndex;
    isFF;

    constructor(props) {
        super(props);
        this.renderSortAbstract(this.data);
        this.isFF = window.navigator.userAgent.indexOf("Firefox")
    }

    componentDidMount() {
        let liParentDom = document.querySelector('.data-display-content ul');
        let lis = document.querySelectorAll('.data-display-content ul li');

        lis.forEach((item, index) => {
            item.setAttribute('id', index);
        })

        

        liParentDom.addEventListener('drag', (e) => {
            e.preventDefault();
            this.dragDom = e.target;
            let lis = document.querySelectorAll('.data-display-content li');
            lis.forEach((item, index) => {
                if (this.dragDom === item) {
                    this.dragIndex = index;
                }
            })
        }, false);
        liParentDom.addEventListener('dragstart', (e) => {
            if(this.isFF !== -1){
                e.dataTransfer.setData("imgInfo", 'ev.target.id'); // 火狐拖拽必须携带数据 IE偏偏不支持这个
            }
        });

        liParentDom.addEventListener('dragenter', (e) => {
            e.preventDefault();
            this.enterDom = e.target;
            let lis = document.querySelectorAll('.data-display-content li');
            lis.forEach((item, index) => {
                if (this.enterDom === item) {
                    this.enterIndex = index;
                }
            })
            this.enterDom.classList.add('hold');
        });

        liParentDom.addEventListener('dragleave', (e) => {
            e.preventDefault();
            // console.log(e.target.classList)
            if (/hold/.test(e.target.classList)) {
                e.target.classList.remove('hold');
            }
        });

        liParentDom.addEventListener("dragover", e => {
            e.preventDefault();
        }, false);

        liParentDom.addEventListener('drop', e => {
            e.preventDefault();
            this.enterDom.classList.remove('hold');
            console.log('drop', e.target);
            if (this.dragIndex < this.enterIndex) {
                this.dragDom.remove();
                this.enterDom.after(this.dragDom);
            } else if (this.dragIndex > this.enterIndex) {
                this.dragDom.remove();
                this.enterDom.before(this.dragDom);
            }
            let lis = document.querySelectorAll('.data-display-content ul li');
            let indexArr = [];
            lis.forEach((item, index) => {
                indexArr.push(Number(item.getAttribute('id')))
            })
            this.sortData = [];
            indexArr.forEach((item, index) => {
                this.sortData.push(this.data.find((itm, idx) => {
                    return item === idx
                }))
            })
            this.sortData.forEach(item => {
                console.log(item.id, 'dom12')
            })

            this.renderSortAbstract(this.sortData);

            console.log(this.dom, 'dom')
        })
    }

    componentDidUpdate() {
        console.log('update')

    }

    renderDataContent() {
        let dom = this.data.map((item, index) => {
            return (
                <li draggable='true' key={item.id}>{item.title}</li>
            )
        });
        return (
            <ul>
                {dom}
            </ul>
        )
    }

    @action
    renderSortAbstract(data) {
        this.dom = data.map((item, index) => {
            return (
                <li draggable='true' key={item.id}>{item.title}</li>
            )
        });
    }

    render() {
        return (
            <div className={'drag-sort-wrapper'}>
                <div className="data-display-content">
                    {this.renderDataContent()}
                </div>
                <div className="data-sort-abstract">
                    <ul>{this.dom}</ul>
                </div>
            </div>
        )
    }
}