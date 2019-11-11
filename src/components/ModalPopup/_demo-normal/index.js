import React, {Component} from 'react';
import ModalPopup from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'ModalPopupNormal';
    static demoName = 'ModalPopup-Normal';

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

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
                <button
                    onClick={() => this.showModal()}
                    style={{verticalAlign: 'top'}}>trigger modal</button>
                <ModalPopup
                    show={this.state.showModal}
                    onClose={() => this.handleCloseModal()}>
                    <h3 style={{textAlign: 'center'}}>Modal</h3>
                </ModalPopup>
            </div>
        )
    }
}