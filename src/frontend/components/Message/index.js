import Information from './information';
import React from 'react';
import { Icon } from 'antd';
import './style.use.less';

let InformationInstance = null;
function getInformationInstance(props) {
    return InformationInstance = InformationInstance || Information.newInstance(props);
}

export function msg(content, option = {}) {
    const { type, duration = 3000, onClose } = option;
    const instance = getInformationInstance({ className: 'once-message-wrapper' });
    let iconType;
    switch (type) {
        case 'success':
            iconType = 'check-circle';
        case 'warning':
            iconType = 'exclamation-circle';
        case 'error':
            iconType = 'close-circle';
        default:
            iconType = 'check-circle'
    }
    const key = instance.info({
        duration,
        onClose,
        content: <div className={`once-message-item once-message-type-${type}`}>
            <Icon type={iconType} theme="filled" />
            <div className={'content'}>{content}</div>
        </div>
    });

    return {
        key,
        remove: () => instance.remove(key)
    }
}

export function removeMsg(key) {
    if (key) {
        const instance = getInformationInstance();
        instance.remove(key);
    }
}

function normal(content, duration, onClose) {
    return msg(content, { type: 'normal', duration, onClose });
}

function success(content, duration, onClose) {
    return msg(content, { type: 'success', duration, onClose });
}

function warning(content, duration, onClose) {
    return msg(content, { type: 'warning', duration, onClose });
}

function error(content, duration, onClose) {
    return msg(content, { type: 'error', duration, onClose });
}

export default {
    normal,
    success,
    warning,
    error
}

