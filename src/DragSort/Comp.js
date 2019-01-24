import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import './style.use.less';

@observer
export default class View extends Component {
    dragDom;
    enterDom;
    dragIndex;
    enterIndex;
    isFF;
    data;
    exportData;

    static propTypes = {
        sortData: PropTypes.array,
        displayTitle: PropTypes.string,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.data = props.sortData;
        this.exportData = props.onChange;
        this.isFF = window.navigator.userAgent.indexOf("Firefox")
    }

    updateSortView() {
        let lis = document.querySelectorAll('.data-sort-abstract ul li');
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
        this.exportData(this.sortData);
    }

    componentDidMount() {
        let liParentDom = document.querySelector('.data-sort-abstract ul');
        let lis = document.querySelectorAll('.data-sort-abstract ul li');

        lis.forEach((item, index) => {
            item.setAttribute('id', index);
        })

        liParentDom.addEventListener('drag', (e) => {
            let _e = e || window.event;
            _e.preventDefault();
            this.dragDom = _e.target;
            let lis = document.querySelectorAll('.data-sort-abstract li');
            lis.forEach((item, index) => {
                if (this.dragDom === item) {
                    this.dragIndex = index;
                }
            })
        }, false);
        liParentDom.addEventListener('dragstart', (e) => {
            let _e = e || window.event;
            _e.dataTransfer.effectAllowed = "move";
            if (this.isFF !== -1) {
                _e.dataTransfer.setData("info", _e.target.id);
                // 火狐拖拽必须携带数据 IE不支持这个(dataTransfer兼容到ie10)
            }
        });

        liParentDom.addEventListener('dragenter', (e) => {
            let _e = e || window.event;
            _e.preventDefault();
            this.enterDom = _e.target;
            let enterDomName = this.enterDom.nodeName.toLowerCase();
            let lis = document.querySelectorAll('.data-sort-abstract li');
            lis.forEach((item, index) => {
                if (this.enterDom === item) {
                    this.enterIndex = index;
                }
            })
            if (enterDomName === 'li') {
                this.enterDom.className = 'hold';
            }
            if (_e.target.nodeName.toLowerCase() === 'li') {
                if (this.dragIndex < this.enterIndex) {
                    liParentDom.removeChild(this.dragDom);
                    liParentDom.insertBefore(this.dragDom, this.enterDom.nextSibling);
                } else if (this.dragIndex > this.enterIndex) {
                    liParentDom.removeChild(this.dragDom);
                    liParentDom.insertBefore(this.dragDom, this.enterDom);
                }
                this.updateSortView();
            }
        });

        liParentDom.addEventListener('dragleave', (e) => {
            let _e = e || window.event;
            _e.preventDefault();
            if (/hold/.test(_e.target.classList)) {
                _e.target.className = '';
            }
        });

        liParentDom.addEventListener("dragover", e => {
            let _e = e || window.event;
            _e.preventDefault();
        }, false);

        liParentDom.addEventListener('drop', e => {
            let _e = e || window.event;
            _e.preventDefault();
            _e.stopPropagation();
            this.enterDom.className = '';
        })
    }

    renderSortAbstract() {
        let dom = this.data.map((item, index) => {
            return (
                <li draggable='true' key={index}>{item[this.props.displayTitle]}</li>
            )
        });
        return (
            <ul>
                {dom}
            </ul>
        )
    }

    render() {
        return (
            <div className={'drag-sort-wrapper'}>
                <div className="data-sort-abstract">
                    {this.renderSortAbstract()}
                </div>
            </div>
        )
    }
}