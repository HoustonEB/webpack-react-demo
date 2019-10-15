import React, {Component} from 'react';
import Modal from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'ModalNormal';
    static demoName = 'Modal-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal/>
            </div>
        )
    }
}