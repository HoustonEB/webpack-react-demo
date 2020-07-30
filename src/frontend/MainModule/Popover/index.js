
import React, { Component } from 'react';
import { h } from '@src/frontend/global/utils';
import Button from '@src/frontend/components/Button';
import './style.use.less';

export default class View extends Component {

    render() {

        return (
            h.div('', {},
                h.div('row-top', {},
                    h(Button, {}, 'top-left'),
                    h(Button, {}, 'top'),
                    h(Button, {}, 'top-right')
                ),
                h.div('row-left', {},
                    h(Button, {}, 'left-top'),
                    h(Button, {}, 'left'),
                    h(Button, {}, 'left-bottom'),
                ),
                h.div('row-right', {},
                    h(Button, {}, 'right-top'),
                    h(Button, {}, 'right'),
                    h(Button, {}, 'right-bottom'),
                ),
                h.div('row-bottom', {},
                    h(Button, {}, 'bottom-left'),
                    h(Button, {}, 'bottom'),
                    h(Button, {}, 'bottom-right'),
                ),
            )
        )
    }
}