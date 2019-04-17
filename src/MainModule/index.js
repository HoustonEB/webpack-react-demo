import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './style.main.less';
const Mock = require('mockjs');

Mock.mock('/getRole', {
    data: {
        ui: 1
    },
    status: 'ok',
    message: 'ui'
});

ReactDOM.render(<App />, document.getElementById('root'));