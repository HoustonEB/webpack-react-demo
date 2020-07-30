import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './info';
import QueueAnim from 'rc-queue-anim';
import './style.use.less';

let seed = 0;
const now = +new Date;
function getUniqueId() {
    return `INFO_ITEM_${now}_${++seed}`;
}

class Information extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        infoList: []
    }

    add(infoProps) {
        let key = infoProps.key = infoProps.key || getUniqueId();

        this.setState(prevState => {
            const infoList = prevState.infoList;
            if (!infoList.some(item => item.key === key)) {
                return {
                    infoList: infoList.concat(infoProps)
                }
            }
        })
        return key;
    }

    remove(key) {
        this.setState(prevState => {
            return {
                infoList: prevState.infoList.filter(item => item.key !== key)
            }
        });
    }

    render() {
        const {
            className
        } = this.props;

        return (
            <div className={className}>
                <QueueAnim 
                delay={100}
                animConfig={[
                    { opacity: [1, 0], translateY: [0, -50] },
                    { opacity: [1, 0], translateY: [0, -50] }
                ]}>
                    {
                        this.state.infoList.map(item => {
                            let { duration, content, onClose, key } = item;
                            return (
                                <Message
                                    key={key}
                                    duration={duration}
                                    onClose={() => {
                                        this.remove(key);
                                        onClose && onClose();
                                    }}>
                                    {content}
                                </Message>
                            )
                        })
                    }
                </QueueAnim>
            </div>
        )
    }
}

Information.newInstance = function (props) {
    const containerDiv = document.createElement('div');
    document.body.appendChild(containerDiv);
    const instance = ReactDOM.render(<Information {...props} />, containerDiv);
    return {
        component: instance,
        info(infoProps) {
            return instance.add(infoProps);
        },
        remove(key) {
            instance.remove(key);
        }
    }
}

export default Information;

