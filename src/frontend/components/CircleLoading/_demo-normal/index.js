import React, {Component} from 'react';
import CircleLoading from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'CircleLoadingNormal';
    static demoName = 'CircleLoading-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CircleLoading/>
        )
    }
}