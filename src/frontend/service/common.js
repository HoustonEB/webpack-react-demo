import {agent} from './global';

export function getRole(data) {
    console.log(agent, 'agent')
    agent.get('/getRole', {params: data}).then(
        (res) => {
            console.log(res, 'res')
        }
    )
}

export function getList(data) {
    agent.post('/getList', {data}).then(
        (res) => {
            console.log(res, 'res')
        }
    )
}

export function getTable(data) {
    agent.post('/getTable', {data}).then(
        (res) => {
            console.log(res, 'res')
        }
    )
}