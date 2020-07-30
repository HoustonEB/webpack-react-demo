import React, {Component} from 'react';
import Bar from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'd3-bar-Normal';
    static demoName = 'd3-bar-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Bar content={'test'}/>
        )
    }
}