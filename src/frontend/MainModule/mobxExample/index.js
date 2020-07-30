import React, { Component } from 'react';
import { data, getData } from '../../global/utils/data';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { h } from '@src/frontend/components/utils'

@observer
export default class mobx extends Component {
    @observable ui = 'sd';
    @observable nameArr = ['张三', '李四'];

    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this)
    }

    @computed
    get name() {
        let firstName = null;
        let arr = this.nameArr.map((item, index) => {
            return item + index
        })
        firstName = arr[0];
        return firstName;
    }

    @action
    updateName() {
        console.log('update')
        // this.nameArr = ['王五', '照玩'];
        this.nameArr[0] = '王五';
    }

    render() {
        return h.div('', {},
            this.name,
            h.button('', {
                onClick: this.updateName
            }, 'updateName')
        )
    }
}