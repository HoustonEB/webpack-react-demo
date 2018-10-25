import React, {Component} from 'react';
import './style.use.less';
import Modal from '../component/ModalPopup';
import TextDisposeMd from './文本处理.md';
import Gradient from './渐变.md';

const md = require('markdown-it')({
    html: false
});
const result1 = md.render(TextDisposeMd);
const result2 = md.render(Gradient);

/**
 * 1.传递事件函数时可以通过箭头函数,不用再在constructor中通过bind再绑定this
 *
 *
 *
 * **/

export default class CssDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    showModal() {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.showModal()}>trigger modal</button>
                <Modal
                    show={this.state.showModal}
                    onClose={() => this.handleCloseModal()}>
                    <h3 style={{textAlign: 'center'}}>Modal</h3>
                    </ Modal>
                <div style={{width: '400px',height: '400px',backgroundColor: '#000'}}></div>
            </div>
        )
    }
}