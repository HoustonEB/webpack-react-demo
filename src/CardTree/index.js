import React, {Component} from 'react';
import {observable, extendObservable, action} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class ExcelDemo extends Component {
    treeData = [];
    @observable treeData = [];
    @observable offsetLeft = 0;

    constructor(props) {
        super(props)
        let data = [
            {name: '百度', id: 1, parentId: 0},
            {name: '职级', id: 2, parentId: 1},
            {name: '商业', id: 3, parentId: 1},
            {name: 'App', id: 4, parentId: 1},
            {name: 'App1', id: 5, parentId: 4},
            {name: 'App2', id: 6, parentId: 4},
            {name: '职级1', id: 7, parentId: 2},
            {name: '职级2', id: 8, parentId: 2},
            {name: '职级3', id: 9, parentId: 2},
            {name: '职级4', id: 16, parentId: 2},
            {name: '职级5', id: 17, parentId: 2},
            {name: '商业a', id: 10, parentId: 3},
            {name: '商业b', id: 11, parentId: 3},
            {name: '商业c', id: 12, parentId: 3},
            {name: '商业d', id: 14, parentId: 3},
            {name: '商业e', id: 15, parentId: 3},
            {name: '无parentId', id: 13, parentId: 898}
        ];
        this.treeData = this.processData(data);
    }

    processData(data) {
        let dataMap = [];
        data.forEach(item => {
            item.children = [];
            extendObservable(item, {show: true, collapse: false});
            dataMap[item.id] = item;
        });
        data.forEach(item => {
            dataMap.forEach(itm => {
                if (item.parentId === itm.id) {
                    itm.children.push(item);
                }
            })
        });
        let roots = [];
        data.forEach(item => {
            if (!dataMap[item.parentId]) {
                roots.push(item);
            }
        });
        let finData = [];
        let recursion = (data, level) => {
            data.forEach(item => {
                item.level = level;
                finData.push(item);
                recursion(item.children, level + 1);
            });
        };
        recursion(roots, 0);
        let data1 = [];
        finData.forEach((item) => {
            item.children.length !== 0 ? item.hasData = true : item.hasData = false;
            if(item.level === 0) {
                data1.push(item);
            }
        });
        data1[data1.length - 1].finItem = true;
        finData.forEach((item) => {
            if(item.level === 1) {
                data1.push(item);
            }
        });
        data1[data1.length - 1].finItem = true;
        finData.forEach((item) => {
            if(item.level === 2) {
                data1.push(item);
            }
        });
        data1[data1.length - 1].finItem = true;
        return data1;
    }

    renderTree(data) {
        let treeConstruceDom = [];
        let level0 = [];
        let level1 = [];
        let level2 = [];
        data.forEach((item, index) => {
            switch (item.level) {
                case 0:
                    level0.push(this.renderSquare(item, index));
                    treeConstruceDom[0] = <table className={`level-0-wrapper`} key={'0'}><tbody><tr>{level0}</tr></tbody></table>;
                    break;
                case 1:
                    level1.push(this.renderSquare(item, index));
                    treeConstruceDom[1] = <table className={`level-1-wrapper`} key={'1'}><tbody><tr>{level1}</tr></tbody></table>;
                    break;
                case 2:
                    level2.push(this.renderSquare(item, index));
                    treeConstruceDom[2] = <table className={`level-2-wrapper`} key={'2'}><tbody><tr>{level2}</tr></tbody></table>;
                    break;
            }
        });
        return (
            treeConstruceDom
        )
    }

    handleControlLevel(data) {
        data.collapse = !data.collapse;
        switch (data.level) {
            case 0:
                this.treeData.forEach(item => {
                    if (item.level !== 0) {
                        if (data.collapse) {
                            item.show = false;
                            item.collapse = true;
                        } else if (item.level === 0 || item.level === 1) {
                            item.show = true;
                            item.collapse = true;
                        }
                    }
                });
                break;
            case 1:
                this.treeData.forEach(item => {
                    if (data.id === item.parentId) {
                        item.show = !item.show;
                    }
                });
                break;
            case 2:
                break;
        }

    }

    @action
    handleOffsetWidth(e) {
        e.stopPropagation();
        let level1 = document.getElementsByClassName('level-1-wrapper')[0];
        this.offsetLeft = Number(e.target.offsetParent.offsetParent.offsetLeft) + 50 - level1.offsetWidth / 2 - 1;
    }

    componentDidMount() {
        let level0 = document.getElementsByClassName('level-0-wrapper')[0];
        let level1 = document.getElementsByClassName('level-1-wrapper')[0];
        let level2 = document.getElementsByClassName('level-2-wrapper')[0];
        level1.style.left = this.offsetLeft + 'px';
    }

    renderSquare(data, key) {
        let dom = <td
            className={`square`}
            style={{
                display: `${data.show ? 'inline-block' : 'none'}`
            }}
            key={key}>
            <i className={`${!data.collapse && data.level !== 2 && data.hasData ? 'tree-bottom-line' : null}`}></i>
            <i className={`${data.level !== 0 ? 'tree-top-line': ''}${data.finItem ? ' del-border-top' : ''}`}></i>
            <span
                className={`${data.hasData ? 'open-icon' : 'none'}`}
                onClick={() => this.handleControlLevel(data)}
                onMouseDown={e => this.handleOffsetWidth(e)}>{`${data.collapse ? '+' : '-'}`}</span>
            <span className={'name'}>{data.name}</span></td>
        return (
            dom
        )
    }

    render() {
        return (
            <div id={'excel-demo'}>
                <div className={'big-wrapper'}>
                    {this.renderTree(this.treeData)}
                </div>
            </div>
        )
    }
}
