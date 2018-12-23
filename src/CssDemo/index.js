import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';
import Modal from '../component/ModalPopup';
import Button from '../component/Button';
import CircleLoading from '../component/circleLoading';
import Accordion from './Accordion';
import CircleProgressBar from '../component/CircleProgressBar';
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
@observer
export default class CssDemo extends Component {
@observable progressNum = 0;

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

    handleChangeNum() {
        let percent = document.getElementsByClassName('percent-num')[0];
        this.progressNum = percent.value;
        console.log(this.progressNum, 'v')
    }

    // componentDidMount() {
    //     let percent = document.getElementsByClassName('percent-num')[0];
    //     this.progressNum = percent.value;
    // }

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
                <input className={'percent-num'} type='range' value={this.progressNum} min='0' max='100' step='1' onChange={() => this.handleChangeNum()}></input>
                {this.progressNum}
                <CircleProgressBar progressNum={this.progressNum}/>
            </div>
        )
    }
}