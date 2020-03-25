
import React, { Component } from 'react';
import Message from '@src/frontend/components/Message';
import { h } from '@src/frontend/global/utils';
import Button from '@src/frontend/components/Button';
import './style.use.less';
import { set } from 'mobx';

const btn1 = [
    {
        type: 'default',
        onClick: () => { console.log('default') },
        name: 'default'
    },
    {
        type: 'primary',
        onClick: () => { console.log('default') },
        name: 'primary'
    },
    {
        type: 'link',
        onClick: () => { console.log('link') },
        name: 'link'
    },
    {
        type: 'success',
        onClick: () => { console.log('link') },
        name: 'success'
    },
    {
        type: 'danger',
        onClick: () => { console.log('link') },
        name: 'danger'
    },
    {
        type: 'pale',
        onClick: () => { console.log('link') },
        name: 'pale'
    },
    {
        type: 'danger',
        iconType: 'highlight',
        onClick: () => { console.log('link') },
        name: 'danger'
    },
    {
        type: 'default',
        iconType: 'copy',
        onClick: () => { console.log('default') },
        name: 'default'
    },
];
const btn2 = [
    {
        type: 'default',
        size: 'large',
        disabled: true,
        onClick: () => { console.log('default') },
        name: 'default'
    },
    {
        type: 'primary',
        size: 'small',
        disabled: true,
        onClick: () => { console.log('default') },
        name: 'primary'
    },
    {
        type: 'link',
        disabled: true,
        onClick: () => { console.log('link') },
        name: 'link'
    },
    {
        type: 'success',
        disabled: true,
        onClick: () => { console.log('link') },
        name: 'success'
    },
    {
        type: 'danger',
        disabled: true,
        onClick: () => { console.log('link') },
        name: 'danger'
    },
    {
        type: 'pale',
        disabled: true,
        onClick: () => { console.log('link') },
        name: 'pale'
    }
];
const btn3 = [
    {
        type: 'default',
        size: 'large',
        loading: true,
        onClick: () => { console.log('default') },
        name: 'default'
    },
    {
        type: 'primary',
        size: 'small',
        loading: true,
        onClick: () => { console.log('default') },
        name: 'primary'
    },
    {
        type: 'link',
        loading: true,
        onClick: () => { console.log('link') },
        name: 'link'
    },
    {
        type: 'success',
        loading: true,
        onClick: () => { console.log('link') },
        name: 'success'
    },
    {
        type: 'danger',
        loading: true,
        onClick: () => { console.log('link') },
        name: 'danger'
    },
    {
        type: 'pale',
        loading: true,
        onClick: () => { console.log('link') },
        name: 'pale'
    }
]
export default class View extends Component {

    state = {
        loading: false,
        size: 'default'
    };

    handleClick() {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            console.log('返回数据');
        }, 5000)
    }

    handleClick1() {
        console.log('async--start');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('async--end');
                resolve('async--end');
            }, 4000)
        })
    }

    render() {
        let {
            loading,
            size
        } = this.state;
        return (
            h.div({},
                h.div({},
                    h(Button, {
                        type: 'default',
                        onClick: () => {this.setState({size: 'small'})},
                    }, 'small'),
                    h(Button, {
                        type: 'default',
                        onClick: () => {this.setState({size: 'default'})},
                    }, 'default'),
                    h(Button, {
                        type: 'default',
                        onClick: () => {this.setState({size: 'large'})},
                    }, 'large'),
                    ),
                h.div({style: { marginTop: '10px' } }, btn1.map((item, index) => {
                    return h(Button, Object.assign(item, { key: index, size }), item.name);
                })),
                h.div({ style: { marginTop: '10px' } }, btn2.map((item, index) => {
                    return h(Button, Object.assign(item, { key: index, size }), item.name);
                })),
                h.div({ style: { marginTop: '10px' } }, btn3.map((item, index) => {
                    return h(Button, Object.assign(item, { key: index, size }), item.name);
                })),
                h.div({ style: { marginTop: '10px' } }, 
                h(Button, {
                    type: 'default',
                    iconType: 'copy',
                    size,
                    loading,
                    onClick: this.handleClick.bind(this),
                    name: 'default'
                }, '定时器'),
                h(Button, {
                    type: 'default',
                    iconType: 'copy',
                    disabled: loading,
                    size,
                    loading,
                    onClick: this.handleClick.bind(this),
                    name: 'default'
                }, 'loading样式'),
                h(Button, {
                    type: 'default',
                    iconType: 'copy',
                    size,
                    onClick: this.handleClick1.bind(this),
                    name: 'default',
                    onClickDone: () => {console.log('done')}
                }, 'asyncLoading')
                ),
            )
        )
    }
}