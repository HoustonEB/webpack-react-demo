
import React, { Component } from 'react';
import Message from '@src/frontend/components/Message';
import Button from '@src/frontend/components/Button';
import { h } from '@src/frontend/global/utils';

export default class View extends Component {
    render() {
        return (
            h.div('', {},
                h(Button, {
                    type: 'success',
                    onClick: () => { Message.success('success') }
                }, 'success'),
                h(Button, {
                    type: 'normal',
                    onClick: () => { Message.normal('normal', 10000) }
                }, 'normal'),
                h(Button, {
                    type: 'danger',
                    onClick: () => { Message.error('error') }
                }, 'error'),
                h(Button, {
                    type: 'pale',
                    onClick: () => { Message.warning('warning') }
                }, 'warning')
            )
        )
    }
}