const axios = require('axios');
const StegCloak = require('stegcloak');
import error from './error';
import login from './login';
import global from './global';

window.stegcloak = new StegCloak(true, false);
window.passport = 'yu';

function ajaxWrap(agent) {
    return function(method, url, opts = {}) {
        Object.assign(opts, {headers: {'Accept-Language': 'us'}});
        // let {params} = opts;
        // console.log(opts, 'data----')
        // for(let key in params) {
        //     params[key] = window.stegcloak.hide(params[key], window.passport, 'cover text');
        // }
        // console.log(params, 'request')

        // for(let key in params) {
        //     console.log(window.stegcloak.reveal(params[key], window.passport), '解密')
        // }
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