import React, {Component} from 'react';
import {observable, extendObservable} from 'mobx';
import { Icon } from 'antd';
import { Table } from 'antd';
import {observer} from 'mobx-react'; // mobx-react提供将react组件转换为响应式组件
import './style.use.less';

@observer
export default class Tree extends Component {
    @observable ui = 3;

    constructor(props) {
        super(props);
        this.convertData();
    }

    convertData() {
        let data = [
            {'parentId': -1, 'dept': 'BG', 'organizationName': '搜索', 'organizationId': 1001},
            {'parentId': -1, 'dept': 'BG', 'organizationName': '职能', 'organizationId': 1002},
            {'parentId': -1, 'dept': 'BG', 'organizationName': '渡鸦', 'organizationId': 1003},
            {'parentId': 1002, 'dept': 'BU', 'organizationName': '职能1', 'organizationId': 10004},
            {'parentId': 1002, 'dept': 'BU', 'organizationName': '职能2', 'organizationId': 10005},
            {'parentId': 1002, 'dept': 'BU', 'organizationName': '职能3', 'organizationId': 10006},
            {'parentId': 1001, 'dept': 'BU', 'organizationName': '搜索1', 'organizationId': 10007},
            {'parentId': 1001, 'dept': 'BU', 'organizationName': '搜索2', 'organizationId': 10008},
            {'parentId': 1001, 'dept': 'BU', 'organizationName': '搜索3', 'organizationId': 10009},
            {'parentId': 1001, 'dept': 'BU', 'organizationName': '搜索4', 'organizationId': 100010},
            {'parentId': 1003, 'dept': 'BU', 'organizationName': '渡鸦1', 'organizationId': 100011},
            {'parentId': 10004, 'dept': 'CC', 'organizationName': '职能1-1', 'organizationId': 100012},
            {'parentId': 10004, 'dept': 'CC', 'organizationName': '职能1-2', 'organizationId': 100013},
            {'parentId': 10007, 'dept': 'CC', 'organizationName': '搜索1-1', 'organizationId': 100015},
            {'parentId': 10007, 'dept': 'CC', 'organizationName': '搜索1-2', 'organizationId': 100016},
            {'parentId': 100011, 'dept': 'CC', 'organizationName': '渡鸦1-1', 'organizationId': 100017},
            {'parentId': 100011, 'dept': 'CC', 'organizationName': '渡鸦1-2', 'organizationId': 100018},
            {'parentId': 99999, 'dept': 'CC', 'organizationName': '无父级', 'organizationId': 9000}
        ];
        let map = [];
        data.forEach((item, index) => {
            map[item.organizationId] = item;
            item.children = [];
            extendObservable(item, {close: false, open: true});
        });
        let roots = [];
        data.forEach(item => {
            // !map[item.parentId]处理无父级的数据
            if (item.parentId === -1 || !map[item.parentId]) {
                roots.push(item);
            } else {
                let parent = map[item.parentId];
                parent.children.push(item);
            }
        });

        this.recursionData(roots, -1);
    }

    result = [];
    recursionData(data, level) {
        data.forEach(item => {
            item.level = level + 1;
            this.result.push(item);
            this.recursionData(item.children, item.level);
        })
    }

    renderUl() {
        let tagArr = [];
        this.result.forEach((item, index) => {
            item.key = index;
            tagArr.push(<li
                key={index}
                style={{display: item.open ? 'block' : 'none'}}
                className={item.level === 0 ? 'level0'
                    : item.level === 1 ? 'level1'
                        : item.level === 2 ? 'level2' : null}
            >
                {item.level === 0 ? <Icon type='right' className={item.close ? null : 'down'} onClick={e => this.handleSwitch(item)} /> :
                item.level === 1 ? <Icon type='double-right' className={item.close ? null : 'down'} onClick={e => this.handleSwitch(item)} /> :
                item.level === 2 ? null : null}
                <span>{item.organizationName}</span>
            </li>);
        });
        return (
            <ul>
                {tagArr}
            </ul>
        )
    }

    handleSwitch(rowItem) {
        rowItem.close = !rowItem.close;
        switch (rowItem.level) {
            case 0:
                let level1List = [];
                this.result.forEach(item => {
                    if (item.level === 1 && item.parentId === rowItem.organizationId) {
                        level1List.push(item.organizationId);
                    }
                });
                this.result.forEach(item => {
                    if ((item.level !== 0 && item.parentId === rowItem.organizationId)
                        || item.level === 2 && level1List.indexOf(item.parentId) !== -1) {
                        if (rowItem.close) {
                            item.close = true;
                            item.open = false;
                        } else {
                            if (item.level === 1) {
                                item.close = true;
                                item.open = true;
                            }
                        }
                    }
                });
                break;
            case 1:
                this.result.forEach(item => {
                    if (item.level === 2 && item.parentId === rowItem.organizationId) {
                        if (rowItem.close) {
                            item.close = true;
                            item.open = false;
                        } else {
                            item.close = true;
                            item.open = true;
                        }
                    }
                });
                break;
        }
    }

    renderTreeWrapper() {
        return (
            <div className={'tree-wrapper'}>
                <div className={'left'}>
                    {this.renderUl()}
                </div>
                <div className={'right'}>
                    {this.renderTable()}
                </div>
            </div>
        )
    }

    renderTable() {
        const columns = [{
            title: 'ParentId',
            key: '1',
            dataIndex: 'parentId'
        }, {
            title: 'Dept',
            key: '2',
            dataIndex: 'dept'
        }, {
            title: 'OrganizationName',
            key: '3',
            dataIndex: 'organizationName'
        }, {
            title: 'OrganizationId',
            key: '4',
            dataIndex: 'organizationId'
        }];

        return (
            <div className={'table-wrapper'}>
                <Table childrenColumnName={'io'} expandIconColumnIndex={-1} sortOrder={false} scroll={{ x: 0, y: 240 }} pagination={false} columns={columns} dataSource={this.result} size="middle" />
            </div>
        )
    }

    componentDidUpdate() {
        let dom = document.querySelectorAll('.left li i');
        console.log(dom, 12);
        dom.forEach(item => {
            item.addEventListener('click', e => {
                console.log(e)
            });
        })
    }

    render() {
        return (
            <div>
                {this.renderTreeWrapper()}
            </div>
        )
    }
}