import React, {Component} from 'react';
import './style.use.less';
import Modal from '../component/ModalPopup';
import Button from '../component/Button';
import CircleLoading from '../component/circleLoading';
import Accordion from './Accordion';
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

    handleClick() {
        // alert('yu')
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => this.showModal()}
                    style={{verticalAlign: 'top'}}>trigger modal</button>
                <Button
                    handleClick={() => this.handleClick()}
                    content={'ENTRY'}
                    style={{verticalAlign: 'top'}}/>
                <Modal
                    show={this.state.showModal}
                    onClose={() => this.handleCloseModal()}>
                    <h3 style={{textAlign: 'center'}}>Modal</h3>
                </Modal>
                {/*<Accordion/>*/}
                <CircleLoading/>
            </div>
        )
    }
}