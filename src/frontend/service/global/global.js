function globalHandler(res, opts) {
    console.log('global');
    // let {data} = res;
    // for(let key in data) {
    //     data[key] = window.stegcloak.reveal(data[key], window.passport)
    // }
    // console.log(res, 'response')
    return res;
}

export default globalHandler;