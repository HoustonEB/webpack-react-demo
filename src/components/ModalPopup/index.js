import React, {Component} from 'react';
import './style.use.less';

export default class ModalPopup extends Component {

    constructor(props) {
        super(props);
        //点击黑色区域关闭弹窗
        // window.addEventListener('click', e => {
        //     let modal = document.querySelector('.modal-wrapper');
        //     if (e.target === modal) {
        //         modal.classList.toggle('show-modal');
        //     }
        // })
    }

    componentWillUnmount() {}

    // shouldComponentUpdate(nextProps, nextState) {}

    componentWillUpdate() {}

    componentDidUpdate() {}

    render() {
        return (
            <div className={'modal-wrapper' + ` ${this.props.show ? 'show-modal' : ''}`}>
                <div className={'modal-content'}>
                    <button
                        onClick={this.props.onClose}
                        style={{marginLeft: '10px'}}>关闭</button>
                    {this.props.children}
                </div>
            </div>
        )
    }
}