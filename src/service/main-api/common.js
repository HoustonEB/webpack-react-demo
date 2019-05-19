const axios = require('axios');

export function getRole() {
    axios.get('/getRole').then(
        (res) => {
            console.log(res, 'res')
        }
    )
}