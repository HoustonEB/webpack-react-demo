import React, {Component} from 'react';
import {Drawer} from 'antd';

export default class draw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.enable
        };
        this.closeDraw = this.closeDraw.bind(this);
    }

    closeDraw() {
        this.setState({
            visible: !this.props.enable
        });
    }

    componentWillMount() {

    }

    componentWillReceiveProps(props) {
        this.setState({
            visible: props.enable
        });
    }

    componentDidUpdate() {
        console.log(1)
        // Get DOM Node
        console.log(this.props.text, 90)
        document.getElementsByClassName('io')[0].innerHTML = this.props.text;
    }

    render() {
        console.log(2)
        return (
            <Drawer
                width={'55vw'}
                placement='right'
                closable={true}
                onClose={this.closeDraw}
                visible={this.state.visible}
            >
                <div className={'io'}>
                </div>
            </Drawer>
        );
    }
}