import {agent} from './global';

export function getRole(data) {
    console.log(agent, 'agent')
    agent.get('http://localhost:3000/getRole', {params: data}).then(
        (res) => {
            console.log(res, 'res')
        }
    )
}

export function getList(data) {
    agent.post('http://localhost:3000/getList', {data}).then(
        (res) => {
            console.log(res, 'res')
        }
    )
}

export function getTable(data) {
    agent.post('http://localhost:3000/getTable', {data}).then(
        (res) => {
            console.log(res, 'res')
        }
    )
}