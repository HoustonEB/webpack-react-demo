import React, {Component} from 'react';
import './style.use.less';

export default class {{compName}} extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'{{compName}}-wrapper'}>{{compName}}</div>
        )
    }
}