import React, {Component} from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import './style.use.less';

@observer
export default class View extends Component {
    @observable labelArr = [];
    colorSets = {
        0: '#87d068',
        1: '#2db7f5',
        2: '#fa0',
        3: '#f50'
    };

    /**===============handleEventFn-start=====================*/
    handleClickTree(e, item) {
        let repeatItm = false;
        this.labelArr.forEach(itm => {
            if (itm.orgId === item.orgId) {
                repeatItm = true;
            }
        });
        if (repeatItm) {
            return
        }
        this.labelArr.push(item);
    }

    handleCloseLabel(e, item) {
        this.labelArr = this.labelArr.filter(itm => {
            return itm.orgId !== item.orgId
        });
        this.labelArr.forEach(item => {
            console.log(item.orgName)
        });
    }

    /**===============handleEventFn-end=====================*/

    renderLeftList() {
        let dataSource = [
            {orgId: 101, orgName: "运维部1", orgType: "DEPT", parentId: 19372},
            {orgId: 102, orgName: "运维部2", orgType: "DEPT", parentId: 19372},
            {orgId: 103, orgName: "运维部3", orgType: "DEPT", parentId: 19372},
            {orgId: 104, orgName: "运维部4", orgType: "DEPT", parentId: 19372},
            {orgId: 105, orgName: "运维部5", orgType: "DEPT", parentId: 19372},
            {orgId: 106, orgName: "运维部6", orgType: "DEPT", parentId: 19372},
            {orgId: 107, orgName: "运维7", orgType: "DEPT", parentId: 19372},
            {orgId: 108, orgName: "运维8", orgType: "DEPT", parentId: 19372},
            {orgId: 109, orgName: "运维9", orgType: "DEPT", parentId: 19372}
        ];
        let domArr = [];
        dataSource.forEach((item, index) => {
            domArr.push(<li key={index} onClick={e => this.handleClickTree(e, item)}>{item.orgName}</li>)
        });
        return (
            <ul>
                {domArr}
            </ul>
        )
    }

    renderRightList() {
        let labelDom = [];
        this.labelArr.forEach((item, index) => {
            labelDom.push(
                <div
                    className={'label-item'}
                    key={index}
                    style={{backgroundColor: this.colorSets[Math.floor(Math.random() * 4)]}}
                >
                    <span>{item.orgName}</span>
                    <Icon type="close" onClick={e => this.handleCloseLabel(e, item)}/>
                </div>)
        });
        return (
            <div>
                {labelDom}
            </div>
        )
    }

    render() {
        return (
            <div className={'transfer-wrapper'}>
                <div className={'transfer-left'}>
                    {this.renderLeftList()}
                </div>
                <div className={'transfer-right'}>
                    {this.renderRightList()}
                </div>
            </div>
        )
    }
}
