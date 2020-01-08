import { message as Message} from 'antd';

function error(res) {
    const {status, message} = res.data;
    if (status === 'no-auth') {
        Message.success('我要跳转了');
    } else if (status !== 'ok' && status !== '200' && status !== 200 && status !== 'OK') {
        Message.error(message);
    }
    return res;
};

export default error;
