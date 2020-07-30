const axios = require('axios');
import error from './error';
import login from './login';
import global from './global';

function ajaxWrap(agent) {
    return function(method, url, opts = {}) {
        Object.assign(opts, {headers: {'Accept-Language': 'us'}});
        return agent({method, url, ...opts})
        .then(global)
        .then(login)
        .then(error);
    }
}

function ajaxMethodWrap(agent) {
    const methods = ['get', 'post', 'put', 'delete'];
    methods.forEach(method => {
        agent[method] = (url, opts) => agent(method, url, opts)
    });
    return agent;
}

let agent = ajaxWrap(axios);
agent = ajaxMethodWrap(agent);

export {
    agent
}