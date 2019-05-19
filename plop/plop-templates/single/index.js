import React, {Component} from 'react';
import './style.use.less';
import {obserable} from 'mobx';
import {observer} from 'mobx-react';

export default class Page extends Component {
    render() {
        return (
            <div className={'{{compName}}-wrapper'}></div>
        )
    }
}