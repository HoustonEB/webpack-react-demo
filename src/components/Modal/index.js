import React, {Component} from 'react';
import './style.use.less';
import {obserable} from 'mobx';
// import {compsPrefix} from '../locale.js';
import {observer} from 'mobx-react';

export default class Modal extends Component {
    static compsKey = 'Modal';
    render() {
        return (
            <div className={`${''}-modal-wrapper`}></div>
        )
    }
}