import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './style.main.less';
import {getRole, getList, getTable} from '../service/common.js';
// const Mock = require('mockjs');

// Mock.mock('/getRole', {
//     data: {
//         ui: 1
//     },
//     status: 'ok',
//     message: 'ui'
// });
// getRole({userName: 'zhangsan'});
// getList({type: 'list'});
// getTable({num: 1});

ReactDOM.render(<App />, document.getElementById('root'));