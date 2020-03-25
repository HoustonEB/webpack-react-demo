import React, {Component} from 'react';
import './style.use.less';

export default class View extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'reg-exr-wrapper'}>
                <div className={'div1'}>水平垂直居中</div>
            </div>
        )
    }
}