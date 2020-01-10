
import React, {Component} from 'react';
import Message from '/src/components/Message';
import { duration } from 'moment';

export default class View extends Component {
    render() {
        return (
            <div>
                <button onClick={() => Message.success('success', 3000, () => {})}>success</button>
                <button onClick={() => Message.normal('normal', 3000)}>normal</button>
                <button onClick={() => Message.error('error', 3000)}>error</button>
                <button onClick={() => Message.warning('warning', 3000)}>warning</button>
            </div>
        )
    }
}