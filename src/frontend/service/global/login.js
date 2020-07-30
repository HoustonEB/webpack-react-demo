import { message as Message} from 'antd';

function login(res) {
    let {status, message} = res.data;
    if (status === 'need-login') {
        Message.warning(message);
        console.log('重定向到登录页')
    }
    return res;
}

export default login;