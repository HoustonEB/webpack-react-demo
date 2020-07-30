import React, { Component, useState } from 'react';
import CountDown from '@src/frontend/components/CountDown';
import { h } from '@src/frontend/components/utils';

export default class View extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            h.div('', {},
                h(CountDown, {
                    endTime: new Date('2020/7/16 17:10:00').getTime(),
                    startTime: new Date().getTime()
                })
            )
        )
    }
}