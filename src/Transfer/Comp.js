import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class View extends Component {
    @observable labelArr = [];

    /**===============handleEventFn-start=====================*/
    handleClickTree(e, item) {
        this.labelArr.push(item);
    }
    /**===============handleEventFn-end=====================*/

    renderLeftList() {
        let dataSource = [
            {orgId: 108, orgName: "运维部1", orgType: "DEPT", parentId: 19372},
            {orgId: 108, orgName: "运维部2", orgType: "DEPT", parentId: 19372},
            {orgId: 108, orgName: "运维部3", orgType: "DEPT", parentId: 19372},
            {orgId: 108, orgName: "运维部4", orgType: "DEPT", parentId: 19372},
            {orgId: 108, orgName: "运维部5", orgType: "DEPT", parentId: 19372},
            {orgId: 108, orgName: "运维部6", orgType: "DEPT", parentId: 19372}
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
            labelDom.push(<label key={index}>{item.orgName}</label>)
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
