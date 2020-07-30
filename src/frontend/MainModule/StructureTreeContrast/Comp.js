import React, {Component} from 'react';
import {observable} from 'mobx';
import './style.use.less';

export default class View extends Component {

    constructor(props) {
        super(props);
        this.leftArr = [];
        this.rightArr = [];
        for(let i = 0; i<100; i++) {
            this.leftArr.push(
                {deptType: "BG", organizationId: i, organizationName: `智能驾驶${i}`, parentId: -1}
            );
            this.rightArr.push(
                {deptType: "BG", organizationId: i, organizationName: `智能驾驶${i}`, parentId: -1}
            )
        }
    }
    @observable selectLeftIndex;
    @observable selectRightIndex;
    @observable selectRightHover = [];

    /**===================Event-Handle-Fn==============================*/
    handleClickLeftTree(e, item) {
        document.querySelector('.right-tree ul').scrollTop = 0;
        this.selectRightHover = [];
        this.rightArr.forEach(
            (itm, idx) => {
                if (item.organizationId === itm.organizationId) {
                    this.selectRightIndex = idx;
                    this.selectRightHover.push(itm.organizationId);
                }
            });
        document.querySelector('.right-tree ul').scrollTop += this.selectRightIndex * 35;
        document.querySelector('.right-tree ul').scrollTop -= 10;
    }

    handleClickRightTree(e, item) {
        console.log('right')
    }

    /**===================Event-Handle-Fn-End==============================*/
    renderLeftTree() {
        let domArr = [];
        this.leftArr.forEach((item, index) => {
            domArr.push(
                <li
                    key={index}
                    onClick={e => this.handleClickLeftTree(e, item)}>
                    {item.organizationName}
                </li>
            )
        });
        return (
            <ul>
                {domArr}
            </ul>
        )
    }

    renderRightTree() {
        let domArr = [];
        // console.log()
        this.rightArr.forEach((item, index) => {
            domArr.push(
                <li
                    key={index}
                    onClick={e => this.handleClickRightTree(e, item)}
                    style={
                        this.selectRightHover.forEach(item => item === item.organizationId)
                            ? {backgroundColor: '#f50'} : null}>
                    {item.organizationName}
                </li>
            )
        });
        return (
            <ul>
                {domArr}
            </ul>
        )
    }

    render() {
        return (
            <div className={'structure-tree-wrapper'}>
                <div className={'left-tree'}>
                    {this.renderLeftTree()}
                </div>
                <div className={'right-tree'}>
                    {this.renderRightTree()}
                </div>
            </div>
        )
    }
}