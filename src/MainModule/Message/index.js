
import React, {Component} from 'react';
import Message from '/src/components/Message';
import {h} from '/src/global/utils';

export default class View extends Component {
    render() {
        return (
            <div>
                <button onClick={() => {console.log(h('div'));Message.success('success')}}>success</button>
                <button onClick={() => Message.normal('normal', 10000, () => {console.log('normal callback')})}>normal</button>
                <button onClick={() => Message.error('error')}>error</button>
                <button onClick={() => Message.warning('warning')}>warning</button>
            </div>
        )
    }
}