import React, {Component} from 'react';
import Button from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'ButtonNormal';
    static demoName = 'Button-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button content={'test'}/>
        )
    }
}